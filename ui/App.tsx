import { ThemeProvider } from "./contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActivityFromDatabase } from "./pages/ActivityFromDatabase.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Activity } from "./pages/Activity.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Activity />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/activity-db" element={<ActivityFromDatabase />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
