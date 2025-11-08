import { FC, useState } from "react";
import { Header } from "../components/Header";
import { ActivityTable } from "../components/ActivityTable";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ActivityData } from "../../backend/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DateSelector } from "../components/DateSelector.tsx";
import { useLocalStorage } from "react-use";
import { SchemaActivityParams } from "../components/ParamsInput.tsx";
import { FORM_LOCAL_STORAGE_KEY } from "../utils/consts.ts";

const ClearDBBtn = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => window.electronAPI.clearActivities(),
    onSuccess: async (_result, _variables, _onMutateResult, context) => {
      console.log("Activities cleared from DB");

      await context.client.invalidateQueries();
    },
    onError: (error) => {
      console.error("Error clearing activities from DB:", error);
    },
  });

  const handleClearAll = () => {
    if (!isPending) mutate();
  };

  return (
    <button
      onClick={handleClearAll}
      className={`px-4 py-2 rounded-lg font-medium transition-colors text-white ${
        isPending
          ? "bg-red-400 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-700"
      }`}
    >
      Clear DB Activity
    </button>
  );
};

export const ActivityFromDatabase: FC = () => {
  const [prevFormValues] = useLocalStorage<SchemaActivityParams>(
    FORM_LOCAL_STORAGE_KEY,
  );

  const [dates, setDates] = useState<string[]>(prevFormValues?.dates || []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["activities-db", dates],
    queryFn: () => window.electronAPI.getDBActivities(dates || []),
    select: (response): ActivityData[] => response?.data || [],
    enabled: Boolean(dates.length),
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-8 flex gap-2 flex-col">
        <DateSelector selectedDates={dates} max={20} onDatesChange={setDates} />
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error.message} />
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && dates?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Select dates to view activity data caches from the DB
            </p>
          </div>
        )}

        {!isLoading && data?.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No activities found in the DB for selected dates
            </p>
          </div>
        )}

        {!isLoading && data?.length && <ActivityTable activities={data} />}
        <ClearDBBtn />
      </main>
    </div>
  );
};
