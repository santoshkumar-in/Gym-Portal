"use client";
import { Dispatch } from "react";
import { Action } from "@/context/UploadProvider";
import { toastSuccess, toastError } from "@/helpers/toast";

export const uploadFile = async (
  file: File,
  id: string,
  metaData: { [s: string]: string },
  dispatch: Dispatch<Action> = () => null,
) => {
  doRealUpload(file, id, metaData, dispatch);
};

const doRealUpload = async (
  file: File,
  id: string,
  metaData: { [s: string]: string },
  dispatch: Dispatch<Action> = () => null,
) => {
  const formData = new FormData();
  formData.append("file", file);

  for (const key in metaData) {
    formData.append(key, metaData[key]);
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", `/api/upload`, true);

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100);
      dispatch({
        type: "UPDATE_PROGRESS",
        payload: { id, progress },
      });
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      toastSuccess("Media uploaded successfully");
      dispatch({ type: "UPDATE_STATUS", payload: { id, status: "completed" } });
    } else {
      toastError("Error in media upload");
      dispatch({ type: "UPDATE_STATUS", payload: { id, status: "error" } });
    }
  };

  xhr.onerror = () => {
    dispatch({ type: "UPDATE_STATUS", payload: { id, status: "error" } });
  };

  dispatch({ type: "UPDATE_STATUS", payload: { id, status: "uploading" } });
  xhr.send(formData);
};

/*
const simulateFakeUpload = (
  file: File,
  id: string,
  metaData: { [s: string]: string },
  dispatch: Dispatch<Action> = () => null,
) => {
  return new Promise<void>((resolve) => {
    let progress = 0;

    // Dispatch initial upload state
    dispatch({ type: "UPDATE_STATUS", payload: { id, status: "uploading" } });

    const interval = setInterval(() => {
      progress += 12; // Increase progress by 10% each interval
      dispatch({
        type: "UPDATE_PROGRESS",
        payload: { id, progress },
      });

      if (progress >= 100) {
        clearInterval(interval);

        // Simulate a successful upload response
        setTimeout(() => {
          dispatch({
            type: "UPDATE_STATUS",
            payload: { id, status: "completed" },
          });
          console.log(id + ": Completed", progress);
          resolve();
        }, 500); // Simulate a slight delay after reaching 100%
      }
    }, 300); // Update every 300ms to simulate real-time progress
  });
};
*/
