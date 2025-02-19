import { useState, useEffect } from "react";
import useFileUpload from "@/hooks/useFileUpload";
import Modal from "@/components/Modal";

const UploadProgress = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { state: files = [] } = useFileUpload();

  useEffect(() => {
    if (files.length > 0) {
      const pending = files.filter((f) => {
        return ["pending", "uploading"].includes(f.status);
      });
      if (pending.length > 0) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [files]);

  return (
    <Modal modalIsOpen={showModal}>
      <div className="fixed bottom-4 right-4 rounded-lg bg-gray-800 p-4 text-white shadow-lg">
        {files.map((file) => (
          <div key={file.id} className="mb-2">
            <p>{file?.file?.name}</p>
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
