import { create } from 'zustand';

export type GenerationJobStatus = 'pending' | 'generating' | 'completed' | 'error';

export interface GenerationJob {
  id: string;
  presetId: string;
  status: GenerationJobStatus;
  resultUri?: string;
  error?: string;
}

export interface Settings {
  quality: 'auto' | 'low' | 'medium' | 'high';
  size: 'auto' | '1024x1024' | '1536x1024' | '1024x1536';
  inputFidelity: boolean;
}

interface JobStore {
  currentStyleId: string | null;
  jobs: GenerationJob[];
  settings: Settings;
  setCurrentStyle: (id: string) => void;
  addJob: (job: GenerationJob) => void;
  updateJob: (id: string, partial: Partial<GenerationJob>) => void;
  updateSettings: (partial: Partial<Settings>) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  currentStyleId: null,
  jobs: [],
  settings: {
    quality: 'auto',
    size: 'auto',
    inputFidelity: false,
  },
  setCurrentStyle: (id) => set({ currentStyleId: id }),
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  updateJob: (id, partial) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...partial } : j)),
    })),
  updateSettings: (partial) => set((state) => ({ settings: { ...state.settings, ...partial } })),
})); 