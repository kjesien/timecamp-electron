import { ActivityData, ActivityParams } from "../types";

export class TimeCampService {
  private baseUrl = "https://app.timecamp.com/third_party/api";
  // private baseUrl = "https://v4.api.timecamp.com";

  async fetchActivities(
    activityParams: ActivityParams,
  ): Promise<ActivityData[]> {
    try {
      const params = new URLSearchParams();
      activityParams.dates.forEach((date) => {
        params.append("dates[]", date);
      });
      params.append("user_id", activityParams.userId);

      const url = `${this.baseUrl}/activity?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          /*
           * NOTE(kjesien): Usually token is obtained from login session data or in the case of API keys from .env files
           * In this case, we are using the token directly from the params as I don't fully understand the behavior of API
           */
          Authorization: `Bearer ${activityParams.userToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `TimeCamp API error: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }

      const data = await response.json();

      // Validate response is an array
      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid response format: expected array of activities",
        );
      }

      return data as ActivityData[];
    } catch (error) {
      console.error("Error fetching activities from TimeCamp API:", error);
      throw error;
    }
  }
}
