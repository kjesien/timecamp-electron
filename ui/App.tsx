import { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header";
import { DateSelector } from "./components/DateSelector";
import { ActivityTable } from "./components/ActivityTable";
import { ErrorMessage } from "./components/ErrorMessage";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ActivityData } from "../backend/types";
import { UserInput } from "./components/UserInput.tsx";

function App() {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch activities
  const fetchActivities = async (dates: string[]) => {
    if (dates.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const response = await window.electronAPI.fetchActivities(dates);

      if (response.success && response.data) {
        setActivities(response.data);
      } else {
        setError(response.error || "Failed to fetch activities");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh || selectedDates.length === 0) return;

    const interval = setInterval(() => {
      fetchActivities(selectedDates);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, selectedDates]);

  // Initial fetch when dates change
  useEffect(() => {
    if (selectedDates.length > 0) {
      fetchActivities(selectedDates);
    }
  }, [selectedDates]);

  const handleRefresh = () => {
    if (selectedDates.length > 0) {
      fetchActivities(selectedDates);
    }
  };

  const handleDatesChange = (dates: string[]) => {
    setSelectedDates(dates);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6 gap-3 flex flex-col">
            <DateSelector
              selectedDates={selectedDates}
              onDatesChange={handleDatesChange}
              onRefresh={handleRefresh}
              autoRefresh={autoRefresh}
              onAutoRefreshChange={setAutoRefresh}
              isLoading={loading}
            />
            <UserInput onChange={() => {}} />
          </div>

          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} onDismiss={() => setError(null)} />
            </div>
          )}

          {loading && selectedDates.length > 0 && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {!loading && selectedDates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Select dates to view activity data
              </p>
            </div>
          )}

          {!loading &&
            selectedDates.length > 0 &&
            activities.length === 0 &&
            !error && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No activities found for selected dates
                </p>
              </div>
            )}

          {!loading && activities.length > 0 && (
            <ActivityTable activities={activities} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
