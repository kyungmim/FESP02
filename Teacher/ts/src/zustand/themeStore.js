import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      // isDarkMode: false,
      //사용자의 컴터 기준에 따라 기본값을 정해줌
      //ex)내 컴터가 다크면 기본값 다크
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "dark-mode",
      storage: createJSONStorage(() => {
        localStorage; //생략시 기본 localstorage
      }),
    }
  )
);

export default useThemeStore;
