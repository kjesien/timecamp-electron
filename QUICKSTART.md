# Quick Start Guide

## Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
Edit the `.env` file and add your TimeCamp API key:
```env
TIMECAMP_API_KEY=your_actual_api_key_here
```

### 3. Run the Application
```bash
npm run dev
```

## Using the Application

### Step 1: Select Dates
- Click the date picker and select a date
- Click "Add" or press Enter
- Or click "Add Today" for quick access

### Step 2: View Activity Data
- Data will automatically load for selected dates
- View all activity details in the table below

### Step 3: Interact with Data
- **Search**: Type in the search box to filter activities
- **Sort**: Click column headers to sort
- **Refresh**: Click the refresh button to update data
- **Auto-refresh**: Toggle the checkbox to enable/disable automatic updates every 30 seconds

### Step 4: Customize Experience
- Click the sun/moon icon to toggle dark/light theme

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    React UI (ui/)                   │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐   │
│  │  Header  │  │   Date   │  │  Activity       │   │
│  │  + Theme │  │ Selector │  │  Table          │   │
│  └──────────┘  └──────────┘  └────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │ IPC (secure)
┌────────────────────▼────────────────────────────────┐
│              Electron Main Process                   │
│  ┌─────────────────────┐  ┌────────────────────┐   │
│  │  TimeCamp Service   │  │  Database Service  │   │
│  │  (API Integration)  │  │  (SQLite)          │   │
│  └─────────────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────┘
                     │
                     ▼
          TimeCamp API + Local Database
```

## Security Features

✅ **Context Isolation** - Renderer isolated from Node.js
✅ **Sandbox Mode** - Restricted process environment
✅ **Content Security Policy** - XSS protection
✅ **No Node Integration** - Secure IPC bridge only
✅ **Type-Safe IPC** - Full TypeScript coverage

## Key Features

- 📊 **Real-time Activity Tracking** - Auto-refresh every 30 seconds
- 💾 **Offline Storage** - SQLite database caching
- 🔍 **Advanced Filtering** - Search and sort by any field
- 🎨 **Theme Support** - Dark/Light mode with persistence
- 📅 **Multi-date Selection** - Up to 20 dates at once
- ⚡ **Performance** - Fast with HMR in development
- 🔒 **Secure** - All Electron security best practices

## Troubleshooting

**Q: Application won't start?**
A: Make sure you've run `npm install` and have Node.js 20.18+ installed

**Q: API errors?**
A: Check your `.env` file has the correct `TIMECAMP_API_KEY`

**Q: No data showing?**
A: Verify your API key is valid and you've selected dates

**Q: Build fails?**
A: Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Development Tips

- Hot Module Replacement (HMR) is enabled - changes reload automatically
- Use Chrome DevTools (opens automatically in dev mode)
- Check the console for detailed error messages
- Database file location varies by OS (see README.md)

## Next Steps

- Run tests: `npm test`
- Format code: `npm run format`
- Lint code: `npm run lint`
- Build for production: `npm run build`

For more details, see the full [README.md](README.md).
