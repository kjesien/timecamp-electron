# TimeCamp Activity Tracker

A modern Electron-based desktop application for tracking and managing TimeCamp user activity data. Built with React, TypeScript, and Tailwind CSS, focusing on performance, security, and user experience.

## Features

- 🔐 **Secure Architecture**: Implements Electron security best practices (contextIsolation, sandbox, CSP)
- 🎨 **Dark/Light Theme**: Toggle between themes with system preference detection
- 🔄 **Auto-Refresh**: Automatically fetches new data every 30 seconds
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
git clone <repository-url>
cd timecamp-electron
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your TimeCamp API key to `.env`:
```env
TIMECAMP_API_KEY=your_actual_api_key_here
```

## Getting Your TimeCamp API Key

1. Log in to your TimeCamp account
2. Go to Account Settings → API
3. Copy your API token
4. Paste it into the `.env` file

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

## Project Structure

```
timecamp-electron/
├── backend/                 # Electron main process
│   ├── main.ts              # Main process entry point
│   ├── preload.ts           # Preload script (IPC bridge)
│   ├── types.ts             # Shared TypeScript types
│   └── services/            # Backend services
│       ├── database.service.ts    # SQLite database handler
│       └── timecamp.service.ts    # TimeCamp API client
├── ui/                     # React application
│   ├── components/          # React components
│   │   ├── ActivityTable.tsx
│   │   ├── DateSelector.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Header.tsx
│   │   └── LoadingSpinner.tsx
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.tsx
│   ├── test/               # Test configuration
│   │   └── setup.ts
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── vitest.config.ts        # Vitest configuration
```

## Features Guide

### Selecting Dates

1. Use the date picker to select a date
2. Click "Add" to add it to your selection
3. Or click "Add Today" for quick access to today's data
4. Select up to 20 dates
5. Remove dates by clicking the X on the date badge
6. Click "Clear All" to remove all selected dates

### Auto-Refresh

- Toggle the "Auto-refresh (30s)" checkbox to enable/disable automatic data fetching
- When enabled, the app will fetch new data every 30 seconds
- Manual refresh is always available via the "Refresh" button

### Searching and Sorting

- Use the search box to filter activities by any field
- Click on column headers to sort by that field
- Click again to reverse the sort direction

### Theme Toggle

- Click the sun/moon icon in the header to toggle between light and dark themes
- The app remembers your preference across sessions
- Defaults to your system theme preference

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

### API Key Issues

If you see "TIMECAMP_API_KEY is not set" error:
1. Ensure the `.env` file exists in the project root
2. Verify the API key is correctly set
3. Restart the application

### Database Issues

If you experience database problems:
1. Close the application
2. Delete the database file (see Database section for location)
3. Restart the application (database will be recreated)

### Build Issues

If the build fails:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try building again

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## License

This project is proprietary software.

## Support

For issues and questions, please contact the development team.
