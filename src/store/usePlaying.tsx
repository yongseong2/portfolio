import { create } from 'zustand';

interface PlayingStore {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const usePlayingStore = create<PlayingStore>((set) => ({
  isPlaying: true,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
}));
