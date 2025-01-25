"use client";
import { useEffect } from "react";
import LightGallery from "lightgallery/react";
//import Image from "next/image";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "./style.css";

function Gallery() {
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
      <a
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
      </a>
      <a
        data-lg-size="1600-2400"
        data-pinterest-text="Pin it2"
        data-tweet-text="lightGallery slide  2"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1508215885820-4585e56135c8?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@therawhunter' >Massimiliano Morosinotto </a></h4><p> Location - <a href='https://unsplash.com/s/photos/tre-cime-di-lavaredo%2C-italia'>Tre Cime di Lavaredo, Italia</a>This is the Way</p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1508215885820-4585e56135c8?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-2400"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1605973029521-8154da591bd7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80https://images.unsplash.com/photo-1603734220970-25a0b335ca01?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@thesaboo' >Sascha Bosshard </a></h4><p> Location - <a href='https://unsplash.com/s/photos/pizol%2C-mels%2C-schweiz'>Pizol, Mels, Schweiz</a></p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1603734220970-25a0b335ca01?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-2398"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1561214078-f3247647fc5e?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@yusufevli' >Yusuf Evli </a></h4><p> Foggy Road</p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1561214078-f3247647fc5e?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-1067"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1600878585887-c2b9530999a1?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@flovayn' >Jay Mantri</a></h4><p>  Misty shroud over a forest</p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1600878585887-c2b9530999a1?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-1067"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://plus.unsplash.com/premium_photo-1677361513506-c27dbaf9369e?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@flovayn' >Florian van Duyn</a></h4><p>Location - <a href='Bled, Slovenia'>Bled, Slovenia</a> </p>"
      >
        <img
          className="img-responsive"
          src="https://plus.unsplash.com/premium_photo-1677361513506-c27dbaf9369e?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-1126"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1599595815336-affbc70dbf60?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@juanster' >Juan Davila</a></h4><p>Location - <a href='Bled, Slovenia'>Bled, Slovenia</a> Wooded lake island </p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1599595815336-affbc70dbf60?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-1063"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@davidmarcu' >David Marcu</a></h4><p>Location - <a href='https://unsplash.com/s/photos/ciuca%C8%99-peak%2C-romania'>Ciucaș Peak, Romania</a> Alone in the unspoilt wilderness </p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-2400"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@whoisbenjamin' >whoisbenjamin</a></h4>
                <p>Location - <a href='https://unsplash.com/s/photos/ciuca%C8%99-peak%2C-romania'>Snowdonia National Park, Blaenau Ffestiniog, UK</a> 
                A swan on a calm misty lake in the mountains of Snowdonia, North Wales. <a href='https://unsplash.com/photos/9V6EkAoTWJM'>Link</a> </p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-1144"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@aaronburden' >Aaron Burden</a></h4><p>Location - <a href='https://unsplash.com/s/photos/grayling%2C-michigan%2C-united-states'>Grayling, Michigan, United States</a> Colorful trees near a lake. <a href='https://unsplash.com/photos/00QWN1J0g48'>Link</a> </p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-1067"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@kalenemsley' >Kalen Emsley</a></h4><p>Location - <a href='https://unsplash.com/s/photos/yukon-territory%2C-canada'>Yukon Territory, Canada</a> No captions. <a href='https://unsplash.com/photos/eHpYD4U5830'>Link</a> </p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-1067"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@kace' >Kace Rodriguez</a></h4><p>Location - <a href='https://unsplash.com/s/photos/pfeiffer-beach%2C-united-states'>Pfeiffer Beach, United States</a> Pfeiffer Beach at Dusk. <a href='https://unsplash.com/photos/eHpYD4U5830'>Link</a> </p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
      <a
        data-lg-size="1600-2400"
        data-pinterest-text="Pin it3"
        data-tweet-text="lightGallery slide  4"
        className="gallery-item"
        data-src="https://images.unsplash.com/photo-1508730328641-47c1616341b7?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@patwhelen' >Pat Whelen</a></h4><p>Location - <a href='https://unsplash.com/s/photos/portsea-vic%2C-australia'>Portsea VIC, Australia</a> No caption <a href='https://unsplash.com/photos/EKLXDQ-dDRg'>Link</a> </p>"
      >
        <img
          className="img-responsive"
          src="https://images.unsplash.com/photo-1508730328641-47c1616341b7?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </a>
    </LightGallery>
  );
}

export default Gallery;
