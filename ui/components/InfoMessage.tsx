import { FC } from "react";

interface InfoMessageProps {
  message: string;
  title?: string;
}

export const InfoMessage: FC<InfoMessageProps> = ({
  message,
  title = "Info",
}) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              {title}
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
