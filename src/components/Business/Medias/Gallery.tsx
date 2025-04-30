"use client";
import React, { useEffect, useState } from "react";
import LightGallery from "lightgallery/react";
import Image from "next/image";
import Masonry from "masonry-layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import imagesLoaded from "imagesloaded";
import Modal from "@/components/Modal";
import { MEDIAS } from "@/types/business";
import { toastSuccess } from "@/helpers/toast";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

function LGWrapper({
  children,
  deleteMode,
}: {
  children: React.ReactNode;
  deleteMode: boolean;
}) {
  if (deleteMode) {
    return <div className="fitnxt-masonry-gallery mx-auto">{children}</div>;
  } else {
    return (
      <LightGallery
        //onInit={onInit}
        speed={500}
        download={false}
        elementClassNames="fitnxt-masonry-gallery mx-auto"
        addClass="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 block"
        //plugins={[lgThumbnail, lgZoom]}
      >
        {children}
      </LightGallery>
    );
  }
}

interface Props {
  medias: MEDIAS;
  deleteMode: boolean;
}

function Gallery({ medias, deleteMode }: Props) {
  const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const container = document.querySelector(".fitnxt-masonry-gallery");
    if (container) {
      // Initialize Masonry
      const msnry = new Masonry(container, {
        itemSelector: ".gallery-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });
      if (msnry.layout) {
        msnry.layout();
      }
    }
  }, [medias]);

  useEffect(() => {
    // Ensure the DOM element exists
    const container = document.querySelector(".fitnxt-masonry-gallery");
    if (container) {
      // Initialize Masonry
      const msnry = new Masonry(container, {
        itemSelector: ".gallery-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });

      // Use imagesLoaded with Masonry
      imagesLoaded(container).on("progress", () => {
        // Layout Masonry after each image loads
        if (msnry.layout) {
          msnry.layout();
        }
      });
    }
  }, [deleteMode]);

  const onDeleteClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    imageId: string,
  ) => {
    console.log("e", e);
    //e.stopPropagation();
    //e.nativeEvent.stopImmediatePropagation();
    setSelected(imageId);
    setShowDeletePrompt(true);
  };

  const onConfirmDelete = () => {
    if (selected) {
      onDeleteCancel();
      toastSuccess(`Media with id ${selected} deleted successfully`);
    }
  };

  const onDeleteCancel = () => {
    setShowDeletePrompt(false);
    setSelected("");
  };

  return (
    <>
      <LGWrapper deleteMode={deleteMode}>
        <div className="grid-sizer w-1/4"></div>
        {medias.map((media) => {
          return (
            <a
              key={media.imageId}
              className="gallery-item mb-1"
              data-src={media.url}
              data-sub-html={`<p>${media.caption}</p>`}
            >
              <div className="relative">
                {deleteMode && (
                  <span
                    onClick={(e) => onDeleteClick(e, media.imageId)}
                    className="z-9s absolute right-1 top-1 cursor-pointer p-1 text-white"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                )}
                <Image
                  alt={media.caption || ""}
                  className="img-responsive"
                  src={media.url}
                  width={240}
                  height={400}
                />
              </div>
            </a>
          );
        })}
        {/* <a
        data-lg-size="1600-1067"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1616279967983-ec413476e824?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@tobbes_rd' >Tobias Rademacher </a></h4><p> Location - <a href='https://unsplash.com/s/photos/puezgruppe%2C-wolkenstein-in-gr%C3%B6den%2C-s%C3%BCdtirol%2C-italien'>Puezgruppe, Wolkenstein in Gröden, Südtirol, Italien</a>layers of blue.</p>"
      >
        <img
          alt="layers of blue."
          className="img-responsive"
          src="https://images.unsplash.com/photo-1616279967983-ec413476e824?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a> */}
      </LGWrapper>
      <Modal modalIsOpen={showDeletePrompt}>
        <span className="mx-auto inline-block">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.1"
              width="60"
              height="60"
              rx="30"
              fill="#DC2626"
            ></rect>
            <path
              d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
              stroke="#DC2626"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          Are you sure?
        </h3>
        <p className="mb-10">
          You want to delete this media. Once deleted the data cannot be
          recovered.
        </p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onDeleteCancel}
              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
            >
              Cancel
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onConfirmDelete}
              className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Gallery;
