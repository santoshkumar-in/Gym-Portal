import { BUSINESS_SERVICE } from "@/types/business";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ServiceState {
  data: BUSINESS_SERVICE[];
  setData: (data: BUSINESS_SERVICE[]) => void;
  clearData: () => void;
  removeService: (serviceId: string) => void;
}

export const useServiceStore = create<ServiceState>()(
  devtools((set) => ({
    data: [],

    setData: (data) =>
      set(
        { data },
        false,
        "serviceStore/setData", // <- Devtools action name
      ),

    clearData: () =>
      set(
        {
          data: [],
        },
        false,
        "serviceStore/clearData", // <- Devtools action name
      ),

    removeService: (serviceId: string) =>
      set(
        (state) => {
          const filtered = state.data.filter(
            (service) => service.serviceMappingId !== serviceId,
          );
          return { data: filtered };
        },
        false,
        { type: "serviceStore/removeService" },
      ),
  })),
);
