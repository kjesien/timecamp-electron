import { useState } from "react";
import { InfoMessage } from "./InfoMessage.tsx";

interface UserIdInputProps {
  onChange: (userId: string, userToken: string) => void;
  initialUserId?: string;
  initialUserToken?: string;
}

export function UserInput({
  onChange,
  initialUserId = "",
  initialUserToken = "",
}: UserIdInputProps) {
  const [userId, setUserId] = useState(initialUserId);
  const [userToken, setUserToken] = useState(initialUserToken);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px] gap-2 flex flex-col">
          <label
            htmlFor="user-id-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            User Id & User Token
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                onChange(e.target.value, userToken);
              }}
              placeholder="Provide User id"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              spellCheck={false}
            />
            <input
              type="text"
              value={userToken}
              onChange={(e) => {
                setUserToken(e.target.value);
                onChange(userId, e.target.value);
              }}
              placeholder="Provide User Token"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              spellCheck={false}
            />
          </div>
          <InfoMessage message="Usually token is obtained from login session data or in the case of API keys from .env files. In this case, I'm using the token directly from the input as I don't fully understand the behavior of API" />
        </div>
      </div>
    </div>
  );
}
