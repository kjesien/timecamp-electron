import { useState } from "react";

interface UserIdInputProps {
  onChange: (userId: string) => void;
  onApply?: (userId: string, token: string) => void;
  isLoading?: boolean;
}

export function UserInput({
  onChange,
  onApply,
  isLoading = false,
}: UserIdInputProps) {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  const apply = () => {
    const trimmed = userId.trim();
    onChange(trimmed);
    onApply?.(userToken.trim(), userToken.trim());
  };

  const clear = () => {
    setUserToken("");
    setUserId("");
    onChange("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="user-id-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            User Id & User Token
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Provide User id"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              spellCheck={false}
            />
            <input
              type="text"
              value={userToken}
              onChange={(e) => setUserToken(e.target.value)}
              placeholder="Provide User Token"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              spellCheck={false}
            />
            <button
              onClick={apply}
              disabled={userToken.trim().length === 0 || isLoading}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={clear}
            disabled={(!userToken && !userId) || isLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
          {onApply && (
            <button
              onClick={apply}
              disabled={isLoading || userToken.trim().length === 0}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              aria-label="Apply user ID"
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
              Submit
            </button>
          )}
        </div>
      </div>

      {(userId || userToken) && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current User ID:
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
            {userId || userToken}
            <button
              onClick={clear}
              className="hover:text-primary-900 dark:hover:text-primary-100"
              aria-label="Clear user ID"
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
          </div>
        </div>
      )}
    </div>
  );
}
