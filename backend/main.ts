import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseService } from "./services/database.service";
import { TimeCampService } from "./services/timecamp.service";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Electron app root path
process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let mainWindow: BrowserWindow | null = null;
let databaseService: DatabaseService;
let timeCampService: TimeCampService;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // Set Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      const csp = [
        "default-src 'self'",
        `script-src 'self' 'unsafe-inline'`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:",
      ].join(";");
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [csp],
        },
      });
    },
  );

  console.log("VITE_DEV_SERVER_URL:", VITE_DEV_SERVER_URL);

  // Load the app
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Initialize services
function initializeServices() {
  const apiKey = process.env.TIMECAMP_API_KEY;
  if (!apiKey) {
    console.error("TIMECAMP_API_KEY is not set in .env file");
  }

  databaseService = new DatabaseService();
  timeCampService = new TimeCampService(apiKey || "");
}

// IPC Handlers
function setupIpcHandlers() {
  // Fetch activities from API and store in database
  ipcMain.handle("fetch-activities", async (_event, dates: string[]) => {
    try {
      const activities = await timeCampService.fetchActivities(dates);
      databaseService.saveActivities(activities);
      return { success: true, data: activities };
    } catch (error) {
      console.error("Error fetching activities:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  });

  // Get activities from database
  ipcMain.handle("get-activities", async (_event, dates: string[]) => {
    try {
      const activities = databaseService.getActivities(dates);
      return { success: true, data: activities };
    } catch (error) {
      console.error("Error getting activities from database:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  });

  // Get all activities from database
  ipcMain.handle("get-all-activities", async () => {
    try {
      const activities = databaseService.getAllActivities();
      return { success: true, data: activities };
    } catch (error) {
      console.error("Error getting all activities from database:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  });

  // Clear database
  ipcMain.handle("clear-activities", async () => {
    try {
      databaseService.clearActivities();
      return { success: true };
    } catch (error) {
      console.error("Error clearing activities:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  });
}

// App lifecycle
app.whenReady().then(() => {
  initializeServices();
  setupIpcHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    databaseService?.close();
    app.quit();
  }
});

app.on("before-quit", () => {
  databaseService?.close();
});
