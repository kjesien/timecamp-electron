import { FC, useState } from "react";
import { Header } from "../components/Header";
import { ActivityTable } from "../components/ActivityTable";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ActivityData } from "../../backend/types";
import { ActivityParams, ParamsInput } from "../components/ParamsInput.tsx";
import { useQuery } from "@tanstack/react-query";

export const Activity: FC = () => {
  const [params, setParams] = useState<ActivityParams>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["activities", params],
    queryFn: () => window.electronAPI.fetchActivities(params?.dates || []),
    select: (response): ActivityData[] => response?.data || [],
    enabled: Boolean(params?.dates),
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ParamsInput onParamsChange={setParams} isLoading={isLoading} />

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

        {!isLoading && params?.dates?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Select dates to view activity data
            </p>
          </div>
        )}

        {!isLoading && data?.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No activities found for selected dates
            </p>
          </div>
        )}

        {!isLoading && data?.length && <ActivityTable activities={data} />}
      </main>
    </div>
  );
};
