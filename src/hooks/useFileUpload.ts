import { useReducer } from "react";
import fileReducer from "@/store/fileReducer";

const useFileUpload = () => {
  const [state, dispatch] = useReducer(fileReducer, []);

  return { state, dispatch };
};
export default useFileUpload;
