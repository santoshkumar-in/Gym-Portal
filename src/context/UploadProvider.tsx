"use client";
import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

export interface FileState {
  id: string;
  file?: File;
  progress?: number;
  status: "pending" | "uploading" | "completed" | "error";
}

export type Action =
  | { type: "ADD_FILE"; payload: FileState }
  | { type: "UPDATE_PROGRESS"; payload: { id: string; progress: number } }
  | {
      type: "UPDATE_STATUS";
      payload: { id: string; status: FileState["status"] };
    }
  | { type: "REMOVE_FILE"; payload: string }
  | { type: "RESET" };

export const fileReducer = (
  state: FileState[],
  action: Action,
): FileState[] => {
  switch (action.type) {
    case "ADD_FILE":
      return [...state, action.payload];
    case "UPDATE_PROGRESS":
      return state.map((file) =>
        file.id === action.payload.id
          ? { ...file, progress: action.payload.progress }
          : file,
      );
    case "UPDATE_STATUS":
      return state.map((file) =>
        file.id === action.payload.id
          ? { ...file, status: action.payload.status }
          : file,
      );
    case "REMOVE_FILE":
      return state.filter((file) => file.id !== action.payload);

    case "RESET":
      return [];
    default:
      return state;
  }
};
// Create context
const UploadContext = createContext<
  { state: FileState[]; dispatch: Dispatch<Action> } | undefined
>(undefined);

// Provider component
export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(fileReducer, []);

  return (
    <UploadContext.Provider value={{ state, dispatch }}>
      {children}
    </UploadContext.Provider>
  );
};

// Custom hook to use UploadContext
export const useUploadContext = () => {
  const context = React.useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};
