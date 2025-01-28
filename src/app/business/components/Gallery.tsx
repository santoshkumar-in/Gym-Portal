"use client";
import { useEffect } from "react";
import LightGallery from "lightgallery/react";
//import Image from "next/image";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { MEDIAS } from "@/types/business";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

interface Props {
  medias: MEDIAS;
}

function Gallery({ medias }: Props) {
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
  }, []);
  return (
    <LightGallery
      //onInit={onInit}
      speed={500}
      download={false}
      elementClassNames="fitnxt-masonry-gallery mx-auto"
      addClass="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 block"
      //plugins={[lgThumbnail, lgZoom]}
    >
      <div className="grid-sizer w-1/4"></div>
      {medias.map((media) => {
        return (
          <a
            key={media.id}
            className="gallery-item mb-1"
            data-src={media.url}
            data-sub-html={`<p>${media.caption}</p>`}
          >
            <img
              alt={media.caption}
              className="img-responsive"
              src={media.url}
              width={240}
            />
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
    </LightGallery>
  );
}

export default Gallery;
