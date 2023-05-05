import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { BiUser, BiPlay } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import Image from "next/image";
import { secondsToMinutes, padTo2Digits } from "@/utils/func";

const Home_Page_TrackItem = ({
  data,
  trackIndex,
  isHome,
  isAlbumPage,
  onRemoveFavorite,
}) => {
  const router = useRouter();

  const [favorites, setFavorites] = useState([]);

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleToggleFavorites = (item) => {
    if (!isHome && !isAlbumPage) {
      onRemoveFavorite();
    } else {
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
    }
  };

  useEffect(() => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    const index = currentFavorites.findIndex(
      (fav) => JSON.stringify(fav.id) === JSON.stringify(data.id)
    );
    setIsHeartFilled(index !== -1);
  }, [data]);

  const goToTrackPage = () => {
    router.push(`/track_page/${data.id}`);
  };

  return (
    <div className={styles.TrackItem}>
      <div className={styles.mainContent} onClick={() => goToTrackPage()}>
        <p className={styles.index}>
          {data?.position
            ? padTo2Digits(data?.position)
            : padTo2Digits(trackIndex + 1)}
        </p>
        <BiPlay className={styles.playIcon} />
        <Image
          src={
            data.artist.picture_medium
              ? data.artist.picture_medium
              : data.album.cover_medium
          }
          width={65}
          height={65}
          alt={data.title}
        />
        <div className={styles.contentTitle}>
          <p className={styles.title}>{data.title}</p>
          <div className={styles.contentArtist}>
            <BiUser className={styles.icon} />
            <p className={styles.artist}>{data?.artist.name}</p>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.duration}>{secondsToMinutes(data.duration)}</p>
        <p className={styles.followers}>{data.rank}</p>
        <div className={styles.reactionsIcons}>
          {isHeartFilled ? (
            <AiFillHeart
              className={`${styles.heart} ${styles.heart_fill}`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorites(data);
              }}
            />
          ) : (
            <AiOutlineHeart
              className={styles.heart}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorites(data);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home_Page_TrackItem;
