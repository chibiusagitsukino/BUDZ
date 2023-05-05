import styles from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BiPlay } from "react-icons/bi";
import { BsStar, BsStarFill } from "react-icons/bs";

const Home_Page_ArtistItem = ({ data, isHome, onRemoveFavorite, isAlbumPage }) => {
  const router = useRouter();

  const single_artist = () => {
    router.push(`/artist_page/${data.id}`);
  };

  const [favoriteArtist, setFavoriteArtist] = useState([]);

  const [isStarFilled, setIsStarFilled] = useState(false);

  const handleToggleFavorites = (item) => { 
    if (!isHome && !isAlbumPage) {
      onRemoveFavorite()
    }
    else{
      const currentFavoriteArtist = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
      const index = currentFavoriteArtist.findIndex((fav) => JSON.stringify(fav.id) === JSON.stringify(item.id));
    
      if (index !== -1)  {
        const updatedFavoriteArtist = [...currentFavoriteArtist];
        updatedFavoriteArtist.splice(index, 1);
        setIsStarFilled(false);
        setFavoriteArtist(updatedFavoriteArtist);
        localStorage.setItem(
          "favoriteArtists",
          JSON.stringify(updatedFavoriteArtist)
        );
      } else {
        const updatedFavoriteArtist = currentFavoriteArtist.concat(item);
        setIsStarFilled(true);
        setFavoriteArtist(updatedFavoriteArtist);
        localStorage.setItem(
          "favoriteArtists",
          JSON.stringify(updatedFavoriteArtist)
        );
      }
    }
  };

  useEffect(() => {
      const currentFavoriteArtist = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
      const index = currentFavoriteArtist.findIndex((fav) => JSON.stringify(fav.id) === JSON.stringify(data.id));
      setIsStarFilled(index !== -1);
  }, []);
 


  return (
    <div className={styles.container}>
      <div className={styles.ArtistItem} onClick={() => single_artist()}>
        <div className={styles.image_name}>
          <Image
            className={styles.img}
            src={data?.picture_medium}
            width={80}
            height={80}
            alt={data?.name}
          />
          <h4 className={styles.artistName}>{data?.name}</h4>
        </div>
        <div className={styles.icons_play}>
          <p className={styles.artist_name_fluo}>{data?.name}</p>
          <div className={styles.playIcon}>
            <BiPlay />
          </div>
        </div>
        <div className={styles.reactionIcons}>
          {isStarFilled ? (
            <BsStarFill
              className={`${styles.star_fill} ${styles.active}`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorites(data);
              }}
            />
          ) : (
            <BsStar
              className={styles.star}
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

export default Home_Page_ArtistItem;
