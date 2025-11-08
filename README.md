# TimeCamp Activity Tracker

A modern Electron-based desktop application for tracking and managing TimeCamp user activity data. Built with React, TypeScript, and Tailwind CSS, focusing on performance, security, and user experience.

## Features

- 🔐 **Secure Architecture**: Implements Electron security best practices (contextIsolation, sandbox, CSP)
- 🎨 **Dark/Light Theme**: Toggle between themes with system preference detection
- 💾 **Local Database**: SQLite storage for offline access and performance
- 📅 **Date Selection**: Select up to 20 dates to view activity data
- 🔍 **Search & Sort**: Filter and sort activities by any column
- ⚡ **Fast & Responsive**: Built with Vite for optimal performance
- 🧪 **Testing Ready**: Configured with Vitest and React Testing Library
- 📝 **Type-Safe**: Full TypeScript support throughout

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Electron** - Desktop framework
- **Node.js** - Runtime environment
- **Better-SQLite3** - Database
- **TimeCamp API** - Data source

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Testing framework

## Prerequisites

- Node.js 20.18+ or 22.12+
- npm 11+

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kjesien/timecamp-electron
cd timecamp-electron
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode

Run the application in development mode with hot module replacement:

```bash
npm run dev
```

### Production Build

Build the application for production:

```bash
npm run build
```

This will create distributable packages in the `release` folder.

### Build Without Packaging

Build the source code without creating distributable packages:

```bash
npm run build:no-pack
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production with electron-builder
- `npm run build:no-pack` - Build without packaging
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI

## Database

The application stores activity data in a SQLite database located at:
- Windows: `%APPDATA%/timecamp-electron/timecamp.db`
- macOS: `~/Library/Application Support/timecamp-electron/timecamp.db`
- Linux: `~/.config/timecamp-electron/timecamp.db`

All fetched activities are stored locally for offline access and improved performance.

## Security Features

- **Context Isolation**: Renderer process is isolated from Node.js
- **Sandbox**: Renderer process runs in a sandboxed environment
- **Content Security Policy**: Strict CSP headers prevent XSS attacks
- **No Node Integration**: Renderer has no direct access to Node.js APIs
- **Preload Script**: Type-safe IPC communication bridge

## API Integration

The application uses the TimeCamp API to fetch activity data:
- **Endpoint**: `https://app.timecamp.com/third_party/api/activity`
- **Authentication**: Bearer token (API key)
- **Method**: GET
- **Parameters**: `dates[]` - Array of date strings (YYYY-MM-DD)

## Troubleshooting
