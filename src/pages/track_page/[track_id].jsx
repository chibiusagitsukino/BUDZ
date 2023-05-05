import styles from "./styles.module.scss";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import YoutubeModal from "@/components/youtubeModal";
import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";

export default function TrackPage({ trackData, youtubeId }) {
  const router = useRouter();
  const [youtubeModal, setYoutubeModal] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const album = () => {
    router.push(`/album_page/${trackData.album.id}`);
  };
  const artist = () => {
    router.push(`/artist_page/${trackData.artist.id}`);
  };
  const openModalYoutube = () => {
    setYoutubeModal(true);
  };
  const closeModalYoutube = () => {
    setYoutubeModal(false);
  };

  const handleToggleFavorites = (item) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const index = currentFavorites.findIndex(
      (fav) => JSON.stringify(fav.id) === JSON.stringify(item.id)
    );

    if (index !== -1) {
      const updatedFavorites = [...currentFavorites];
      updatedFavorites.splice(index, 1);
      setIsHeartFilled(false);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = currentFavorites.concat(item);
      setIsHeartFilled(true);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
    // }
  };

  useEffect(() => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const index = currentFavorites.findIndex(
      (fav) => JSON.stringify(fav.id) === JSON.stringify(trackData.id)
    );
    setIsHeartFilled(index !== -1);
  }, [trackData.id]);

  return (
    <MainLayout>
      <div
        className={styles.TrackPage}
        style={{ backgroundImage: `url(${trackData.album.cover_xl})` }}
      >
        <div className={styles.container}>
          <div className={styles.Navbar}>
            <Navbar />
          </div>
          <div className={styles.img_icon}>
            <Image
              className={styles.img}
              src={trackData.artist.picture_xl}
              width={500}
              height={500}
              alt={trackData.title}
            />
            {isHeartFilled ? (
              <AiFillHeart
                className={`${styles.heart_filled} ${styles.active}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorites(trackData);
                }}
              />
            ) : (
              <AiOutlineHeart
                className={styles.heart}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorites(trackData);
                }}
              />
            )}
          </div>
          <div className={styles.links}>
            <p onClick={artist}>{`Discover more of ${trackData.artist.name}`}</p>
            <div onClick={openModalYoutube} className={styles.youtube}>
              <h4>Watch on</h4>
              <Image
                src="/globalimages/youtube.jpeg"
                width={100}
                height={35}
                alt="youtube"
              />
            </div>
          </div>
          <div className={styles.player}>
            <div className={styles.deezerPlayer}>
              <iframe
                title="deezer-widget"
                src={`https://widget.deezer.com/widget/dark/track/${trackData.id}?tracklist=false`}
                width="100%"
                height="130"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media; clipboard-write"
              ></iframe>
            </div>
          </div>
          {youtubeModal && (
            <YoutubeModal
              closeModalYoutube={closeModalYoutube}
              youtubeId={youtubeId}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const resTrack = await fetch(
    `https://api.deezer.com/track/${context.query.track_id}`
  );
  const trackData = await resTrack.json();

  const searchQuery =
    trackData.title
      .replaceAll(" ", "+")
      .replaceAll(",", "+")
      .replaceAll(".", "+") +
    "+" +
    trackData.artist.name
      .replaceAll(" ", "+")
      .replaceAll(",", "+")
      .replaceAll(".", "+");

  const resYoutube = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=AIzaSyDXm7O6AY7HQGSWdWBLmvyMM1RC9D1NHro`
  );

  const youtubeData = await resYoutube.json();

  return {
    props: {
      trackData,
      youtubeId: youtubeData.items[0].id.videoId,
    },
  };
}
