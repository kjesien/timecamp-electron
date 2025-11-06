import { contextBridge, ipcRenderer } from 'electron';
import { ActivityData, IpcResponse } from './types';

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  fetchActivities: (dates: string[]): Promise<IpcResponse<ActivityData[]>> =>
    ipcRenderer.invoke('fetch-activities', dates),

  getActivities: (dates: string[]): Promise<IpcResponse<ActivityData[]>> =>
    ipcRenderer.invoke('get-activities', dates),

  getAllActivities: (): Promise<IpcResponse<ActivityData[]>> =>
    ipcRenderer.invoke('get-all-activities'),

  clearActivities: (): Promise<IpcResponse<void>> => ipcRenderer.invoke('clear-activities'),
});
