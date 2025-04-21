import { create } from 'zustand';

interface NavStore {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  isExpanded: true,
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
}));
