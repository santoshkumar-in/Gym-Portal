import { cookies } from "next/headers";
import { FileState } from "@/store/fileReducer";

type DispatchFunc = (arg: { type: string; payload: FileState }) => void;

export const uploadFile = async (
  file: File,
  id: string,
  metaData?: { [s: string]: string },
  dispatch: DispatchFunc = () => null,
) => {
  const formData = new FormData();
  formData.append("file", file);

  for (const key in metaData) {
    formData.append(key, metaData[key]);
  }

  const token = (await cookies()).get("jwtToken")?.value; // Fetch JWT token

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/upload", true);
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100);
      dispatch({
        type: "UPDATE_PROGRESS",
        payload: { id, progress, status: "uploading" },
      });
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      dispatch({ type: "UPDATE_STATUS", payload: { id, status: "completed" } });
    } else {
      dispatch({ type: "UPDATE_STATUS", payload: { id, status: "error" } });
    }
  };

  xhr.onerror = () => {
    dispatch({ type: "UPDATE_STATUS", payload: { id, status: "error" } });
  };

  dispatch({ type: "UPDATE_STATUS", payload: { id, status: "uploading" } });
  xhr.send(formData);
};
