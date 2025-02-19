"use client";
import { useState, useEffect } from "react";
import { useUploadContext } from "@/context/UploadProvider";
import Modal from "@/components/Modal";
import { truncateString } from "@/helpers";

const UploadProgress = () => {
  const { state: files = [], dispatch } = useUploadContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    if (files.length > 0) {
      const pending = files.filter((f) => {
        return ["pending", "uploading"].includes(f.status);
      });
      if (pending.length > 0) {
        setShowModal(true);
      } else {
        setShowModal(false);
        dispatch({
          type: "RESET",
        });
      }
    }
  }, [files]);

  return (
    <Modal className="relative max-w-142.5" modalIsOpen={showModal}>
      <h4 className="mb-5 text-lg">Uploading...</h4>
      <div className="border-b">
        {files.map((file, i) => (
          <div key={file.id} className="mb-2 flex items-center justify-between">
            <p>
              {i + 1}. {truncateString(file?.file?.name)}
            </p>
            <div className="h-2.5 w-40 rounded-full bg-gray-600">
              <div
                className="h-2.5 rounded-full bg-blue-500"
                style={{ width: `${file.progress}%` }}
              ></div>
            </div>
            <p>{file.status}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default UploadProgress;
