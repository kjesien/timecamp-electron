import { contextBridge, ipcRenderer } from "electron";
import { ActivityData, ElectronAPI, IpcResponse } from "./types";

contextBridge.exposeInMainWorld("electronAPI", {
  fetchActivities: (params): Promise<IpcResponse<ActivityData[]>> =>
    ipcRenderer.invoke("fetch-activities", params),

  getDBActivities: (dates: string[]): Promise<IpcResponse<ActivityData[]>> =>
    ipcRenderer.invoke("get-activities", dates),

  clearActivities: (): Promise<IpcResponse<void>> =>
    ipcRenderer.invoke("clear-activities"),
} satisfies ElectronAPI);
