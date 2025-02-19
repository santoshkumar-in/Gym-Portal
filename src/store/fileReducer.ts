export interface FileState {
  id: string;
  file?: File;
  progress?: number;
  meta?: { [s: string]: string };
  status: "pending" | "uploading" | "completed" | "error";
}

type Action =
  | { type: "ADD_FILE"; payload: FileState }
  | { type: "UPDATE_PROGRESS"; payload: { id: string; progress: number } }
  | {
      type: "UPDATE_STATUS";
      payload: { id: string; status: FileState["status"] };
    }
  | { type: "REMOVE_FILE"; payload: string };

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
    default:
      return state;
  }
};

export default fileReducer;
