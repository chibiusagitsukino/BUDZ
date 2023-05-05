import styles from "./index.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import {BsStar, BsStarFill} from "react-icons/bs"

const Artist_Page_ArtistItem = ({ artistData }) => {

  const [favoriteArtist, setFavoriteArtist] = useState([]);

  const [isStarFilled, setIsStarFilled] = useState(false)

  const handleToggleFavorites = (item) => {
      const currentFavoriteArtist = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
      const index = currentFavoriteArtist.findIndex((fav) => JSON.stringify(fav.id) === JSON.stringify(item.id));
    
      if (index !== -1)  {
        const updatedFavoriteArtist = [...currentFavoriteArtist];
        updatedFavoriteArtist.splice(index, 1);
        setIsStarFilled(false)
        setFavoriteArtist(updatedFavoriteArtist);
        localStorage.setItem("favoriteArtists", JSON.stringify(updatedFavoriteArtist));
      } else {
        const updatedFavoriteArtist = currentFavoriteArtist.concat(item);
        setIsStarFilled(true)
        setFavoriteArtist(updatedFavoriteArtist);
        localStorage.setItem("favoriteArtists", JSON.stringify(updatedFavoriteArtist));
      }
    
  }

  useEffect(() => {
    const currentFavoriteArtist = JSON.parse(localStorage.getItem("favoriteArtists")) || [];
    const index = currentFavoriteArtist.findIndex((fav) => JSON.stringify(fav.id) === JSON.stringify(artistData.id));
    setIsStarFilled(index !== -1);
  }, [artistData.id]);


  return (
    <div className={styles.container}>
      <div className={styles.info_artist}>
        <Image
          className={styles.img}
          src={artistData.picture_medium}
          width={200}
          height={200}
          alt={artistData.name}
        />

        <h1 className={styles.name_artist_desktop}>{artistData.name}</h1>
        <p>{`N° Albums: ${artistData.nb_album}`}</p>
        <p>{`Follower: ${artistData.nb_fan}`}</p>
        {isStarFilled ? (
            <BsStarFill
              className={styles.star_filled}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorites(artistData);
              }}
            />
          ) : (
            <BsStar
              className={styles.star}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorites(artistData);
              }}
            />
          )}
      </div>
      <div className={styles.name_artist}>
        <h1>{artistData.name}</h1>
      </div>
    </div>
  );
};

export default Artist_Page_ArtistItem;
