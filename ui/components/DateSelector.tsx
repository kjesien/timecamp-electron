import { useState } from "react";

interface DateSelectorProps {
  selectedDates: string[];
  onDatesChange: (dates: string[]) => void;
  onRefresh: () => void;
  autoRefresh: boolean;
  onAutoRefreshChange: (enabled: boolean) => void;
  isLoading: boolean;
}

export function DateSelector({
  selectedDates,
  onDatesChange,
  onRefresh,
  autoRefresh,
  onAutoRefreshChange,
  isLoading,
}: DateSelectorProps) {
  const [inputDate, setInputDate] = useState("");

  const handleAddDate = () => {
    if (inputDate && !selectedDates.includes(inputDate)) {
      if (selectedDates.length >= 20) {
        alert("Maximum 20 dates can be selected");
        return;
      }
      onDatesChange([...selectedDates, inputDate].sort().reverse());
      setInputDate("");
    }
  };

  const handleRemoveDate = (date: string) => {
    onDatesChange(selectedDates.filter((d) => d !== date));
  };

  const handleAddToday = () => {
    const today = new Date().toISOString().split("T")[0];
    if (!selectedDates.includes(today)) {
      if (selectedDates.length >= 20) {
        alert("Maximum 20 dates can be selected");
        return;
      }
      onDatesChange([...selectedDates, today].sort().reverse());
    }
  };

  const handleClearAll = () => {
    onDatesChange([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="date-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Select Date
          </label>
          <div className="flex gap-2">
            <input
              id="date-input"
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyDown={(e) => e.key === "Enter" && handleAddDate()}
            />
            <button
              onClick={handleAddDate}
              disabled={!inputDate}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToday}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Add Today
          </button>
          <button
            onClick={onRefresh}
            disabled={isLoading || selectedDates.length === 0}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg
              className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
          {selectedDates.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => onAutoRefreshChange(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Auto-refresh (30s)
          </span>
        </label>
      </div>

      {selectedDates.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selected Dates ({selectedDates.length}/20):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map((date) => (
              <span
                key={date}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
              >
                {date}
                <button
                  onClick={() => handleRemoveDate(date)}
                  className="hover:text-primary-900 dark:hover:text-primary-100"
                  aria-label={`Remove ${date}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
