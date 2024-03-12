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

type useDesktopActiveFolderType = {
  active: null | number;
  setActive: (id: number) => void;
};

export const useDesktopActiveFolder = create<useDesktopActiveFolderType>(
  (set) => ({
    active: null,
    setActive: (id) => set({ active: id }),
    clear: () => set({ active: null }),
  })
);
