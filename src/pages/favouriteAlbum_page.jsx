import styles from "../pages/favoriteAlbum_page/styles.module.scss";
import { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import Home_Page_AlbumItem from "@/components/home_page_albumItem";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";

const FavoriteAlbum_Page = ({ data, trackIndex }) => {
  const router = useRouter();
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);

  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    try {
      const storedFavoriteAlbums =
        JSON.parse(localStorage.getItem("favoriteAlbums")) || [];
      setFavorites(storedFavoriteAlbums);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const removeFavorite = (id) => {
    const updatedFavoriteAlbums = favoriteAlbums.filter((f) => f.id !== id);
    setFavoriteAlbums(updatedFavoriteAlbums);

    try {
      localStorage.setItem(
        "favoriteAlbums",
        JSON.stringify(updatedFavoriteAlbums)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteAlbums")) || [];
    if (JSON.stringify(favoriteAlbums) !== JSON.stringify(storedFavorites)) {
      setFavoriteAlbums(storedFavorites);
    }
  }, [favoriteAlbums]);

  return (
    <MainLayout>
      <div className={styles.FavoriteAlbumPage}>
        <div className={styles.Navbar}>
          <Navbar title={"Your favourite Albums"} />
        </div>
        {favoriteAlbums.length > 0 ? (
          <div className={styles.albums}>
            {favoriteAlbums.map((favAlbum) => (
              <Home_Page_AlbumItem
                key={favAlbum.id}
                data={favAlbum}
                albumIndex={data?.position}
                isHome={isHome}
                onRemoveFavorite={() => removeFavorite(favAlbum.id)}
              />
            ))}
          </div>
        ) : (
          <p className={styles.noFavorites}>
            You do not have any favourites yet!
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default FavoriteAlbum_Page;
