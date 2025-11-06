import { ActivityData } from "../types";

export class TimeCampService {
  private apiKey: string;
  private baseUrl = "https://app.timecamp.com/third_party/api";
  // private baseUrl = "https://v4.api.timecamp.com";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchActivities(dates: string[]): Promise<ActivityData[]> {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      dates.forEach((date) => {
        params.append("dates[]", date);
        params.append("user_id", "2584891");
      });

      const url = `${this.baseUrl}/activity?${params.toString()}`;
      console.log("url", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
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
