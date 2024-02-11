import { create } from 'zustand'

type LayouSetType = {
    sidebar:"full" | "min";
    page: "middle" | "full";
}
export type LayouType = {
    sidebar:"full" | "min";
    page: "middle" | "full";
    setLayoutWidth: (value:LayouSetType) => void;
}

export const useLayoutWidth = create((set) => ({
  sidebar:"full",
  page:"middle",

  setLayoutWidth: (value:LayouSetType) => set({ sidebar: value.sidebar, page: value.page}),
 
}))