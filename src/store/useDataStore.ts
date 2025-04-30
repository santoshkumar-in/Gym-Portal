import { BUSINESS_USER } from "@/types/business";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  data: BUSINESS_USER[];
  setData: (data: BUSINESS_USER[]) => void;
  clearData: () => void;
  removeUser: (userId: string) => void;
}

export const useDataStore = create<UserState>()(
  devtools((set) => ({
    data: [],

    setData: (data) =>
      set(
        { data },
        false,
        "userStore/setData", // <- Devtools action name
      ),

    clearData: () =>
      set(
        {
          data: [],
        },
        false,
        "userStore/clearData", // <- Devtools action name
      ),

    removeUser: (userId: string) =>
      set(
        (state) => {
          const filtered = state.data.filter((user) => user.userId !== userId);
          return { data: filtered };
        },
        false,
        { type: "userStore/removeService" },
      ),
  })),
);
