import { create } from "zustand";

type useCoordsType = {
  coords: {
    x: number;
    y: number;
  };
  setCoords: (obj: { x: number; y: number }) => void;
};

export const useCoords = create<useCoordsType>((set) => ({
  coords: { x: 0, y: 0 },
  setCoords: (obj) => set({ coords: obj }),
}));
