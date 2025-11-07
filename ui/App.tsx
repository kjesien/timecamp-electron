import { ThemeProvider } from "./contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Activity } from "./pages/Activity.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Activity />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
