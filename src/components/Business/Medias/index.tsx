"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { getMedias } from "@/actions/business";
import { MEDIAS } from "@/types/business";
import Gallery from "./Gallery";
import { uploadFile } from "@/actions/media";
import { useUploadContext } from "@/context/UploadProvider";
import {
  BUSINESS_GALLERY,
  CAT_SERVICE_IMAGE,
  CAT_INTERIOR_IMAGE,
  CAT_OTHER_IMAGE,
} from "@/enums";

interface Props {
  businessId: string;
}

const categories = [
  {
    value: CAT_SERVICE_IMAGE,
    label: "Service",
  },
  {
    value: CAT_INTERIOR_IMAGE,
    label: "Interior",
  },
  {
    value: CAT_OTHER_IMAGE,
    label: "Other",
  },
];

const Medias = ({ businessId }: Props) => {
  const [medias, setMedias] = useState<MEDIAS>();
  const [deleteMode, setDeleteMode] = useState(false);
  const { dispatch } = useUploadContext();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      const { data = [] } = await getMedias(businessId);
      setMedias(data);
    }
    getData();
  }, [businessId]);

  const toggle = () => {
    setDeleteMode(!deleteMode);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (!event.target.files || !selectedCategory) return;

    const filesArray = Array.from(event.target.files);
    filesArray.forEach((file) => {
      const id = uuidv4();
      const metaData = {
        businessId,
        type,
        category: selectedCategory,
      };

      dispatch({
        type: "ADD_FILE",
        payload: {
          id,
          file,
          progress: 0,
          status: "pending",
        },
      });
      uploadFile(file, id, metaData, dispatch);
    });

    setSelectedCategory(null);
  };

  if (!medias) {
    return "Loading...";
  }

  return (
    <div className="mt-4">
      <div className="mb-4 flex items-center rounded-sm bg-white px-4 py-4 shadow-default sm:px-6 xl:px-7.5">
        <h3 className="font-bold text-black dark:text-white">Image Gallery</h3>
        <button
          onClick={toggle}
          className="ml-auto rounded bg-red-500 px-5 py-1 text-center font-medium text-white hover:bg-opacity-90"
        >
          <FontAwesomeIcon icon={faTrashCan} />{" "}
          {deleteMode ? "Exit Delete Mode" : "Enter Delete Mode"}
        </button>

        <div className="ml-2">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80"
          >
            <span>
              <svg
                className="fill-current"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                  fill="white"
                />
              </svg>
            </span>
            <span>Upload</span>
          </button>
        </div>
      </div>

      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-md bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">Select Category</h2>
            <div className="space-y-2">
              {categories.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedCategory(value);
                    setIsCategoryModalOpen(false);
                    document.getElementById("upload-image-in-gallery")?.click();
                  }}
                  className="block w-full rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-900"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        multiple
        onChange={(e) => handleFileChange(e, BUSINESS_GALLERY)}
        name="gallery-image"
        id="upload-image-in-gallery"
        accept="image/png, image/jpeg"
        className="hidden"
      />

      <Gallery medias={medias} deleteMode={deleteMode} />
    </div>
  );
};

export default Medias;
