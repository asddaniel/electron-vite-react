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
export const useAuth = create((set)=>({
    auth:{
      isLogged:JSON.parse(localStorage.getItem("user") || "false")?true:false,
      user:JSON.parse(localStorage.getItem("user") || "{}"),
    },
    setAuth:(value:{isLogged:boolean, user:any})=>set({auth:{isLogged:value.isLogged, user:value.user}}),
}))