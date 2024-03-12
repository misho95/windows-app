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

type useDestkopStoreType = {
  desktop: fileType[];
  setDesktop: (array: fileType[]) => void;
};

export const useDestkopStore = create<useDestkopStoreType>((set) => ({
  desktop: [
    {
      id: 0,
      title: "new folder",
      type: "folder",
      position: { x: 0, y: 0 },
    },
    {
      id: 1,
      title: "new folder 2",
      type: "folder",
      position: { x: 0, y: 70 },
    },
  ],
  setDesktop: (array) => set({ desktop: array }),
}));

type useDesktopActiveFolderType = {
  active: null | number;
  setActive: (id: number) => void;
  clear: () => void;
};

export const useDesktopActiveFolder = create<useDesktopActiveFolderType>(
  (set) => ({
    active: null,
    setActive: (id) => set({ active: id }),
    clear: () => set({ active: null }),
  })
);

type useDesktopViewOptionsType = {
  auto: boolean;
};

type useDesktopViewType = {
  options: useDesktopViewOptionsType;
  setType: (obj: useDesktopViewOptionsType) => void;
};

export const useDesktopView = create<useDesktopViewType>((set) => ({
  options: { auto: true },
  setType: (obj) => set({ options: obj }),
}));
