export interface ActivityData {
  user_id: string;
  application_id: string;
  end_time: string;
  time_span: number;
  window_title_id: string;
  end_date: string;
  task_id: string;
  entry_id: string;
}

export interface IpcResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ElectronAPI {
  fetchActivities: (dates: string[]) => Promise<IpcResponse<ActivityData[]>>;
  getActivities: (dates: string[]) => Promise<IpcResponse<ActivityData[]>>;
  getAllActivities: () => Promise<IpcResponse<ActivityData[]>>;
  clearActivities: () => Promise<IpcResponse<void>>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
