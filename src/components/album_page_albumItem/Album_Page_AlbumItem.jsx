import styles from "./index.module.scss";
import Image from "next/image";
import { secondsToMinutes } from "@/utils/func";
import { BsFolderFill, BsFolder } from "react-icons/bs";
import { useState, useEffect } from "react";

import Home_Page_ArtistItem from "../home_page_artistItem/Home_Page_ArtistItem";

const Album_Page_AlbumItem = ({ data, isAlbumPage }) => {
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);

  const [isFolderFilled, setIsFolderFilled] = useState(false);

  const handleToggleFavorites = (item) => {
    const currentFavoriteAlbum =
      JSON.parse(localStorage.getItem("favoriteAlbums")) || [];
    const index = currentFavoriteAlbum.findIndex(
      (fav) => JSON.stringify(fav.id) === JSON.stringify(item.id)
    );

    if (index !== -1) {
      const updatedFavoriteAlbum = [...currentFavoriteAlbum];
      updatedFavoriteAlbum.splice(index, 1);
      setIsFolderFilled(false);
      setFavoriteAlbums(updatedFavoriteAlbum);
      localStorage.setItem(
        "favoriteAlbums",
        JSON.stringify(updatedFavoriteAlbum)
      );
    } else {
      const updatedFavoriteAlbum = currentFavoriteAlbum.concat(item);
      setIsFolderFilled(true);
      setFavoriteAlbums(updatedFavoriteAlbum);
      localStorage.setItem(
        "favoriteAlbums",
        JSON.stringify(updatedFavoriteAlbum)
      );
    }
  };

  useEffect(() => {
    const currentFavoriteAlbum =
      JSON.parse(localStorage.getItem("favoriteAlbums")) || [];
    const index = currentFavoriteAlbum.findIndex(
      (fav) => JSON.stringify(fav.id) === JSON.stringify(data.id)
    );
    setIsFolderFilled(index !== -1);
  }, [data.id]);

  const explicitLyrics = data?.explicit_content_lyrics !== 0;
  return (
    <div className={styles.container}>
      <div className={styles.upper_info}>
        <div className={styles.img_album}>
          <Image
            className={styles.img}
            src={data?.cover_xl}
            fill
            alt={data?.title}
          />
          <div className={styles.folder}>
            {isFolderFilled ? (
              <BsFolderFill
                className={styles.folder_filled }
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorites(data);
                }}
              />
            ) : (
              <BsFolder
                className={styles.folder}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorites(data);
                }}
              />
            )}
          </div>
        </div>
        <div className={styles.name_album}>
          <h1>{data?.title}</h1>
        </div>
      </div>
      <div className={styles.bottom_info}>
        <div className={styles.contributors_album}>
          {data?.contributors.map((data, i) => (
            <Home_Page_ArtistItem
              key={i}
              data={data}
              isAlbumPage={isAlbumPage}
            />
          ))}
        </div>
        <h3 className={styles.artistName_mobile}>{data?.artist.name}</h3>
        <div className={styles.info_album}>
          <p>{`Genre: ${data?.genres.data[0].name}`}</p>
          <p>{`Label: ${data?.label}`}</p>
          <p>{`Duration: ${secondsToMinutes(data?.duration)} min`}</p>
          <p>{`Tracks number: ${data?.nb_tracks}`}</p>
          <p>{`Followers: ${data?.fans}`}</p>
          <p>{`Release Date: ${data?.release_date}`}</p>
          {explicitLyrics && (
            <p>{`Explicit Lyrics: ${data?.explicit_content_lyrics}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Album_Page_AlbumItem;
