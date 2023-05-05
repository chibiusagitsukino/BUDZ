import styles from "../pages/favoriteArtist_page/styles.module.scss";
import { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import Home_Page_ArtistItem from "@/components/home_page_artistItem";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";

const FavoriteArtist_Page = ({ data, trackIndex }) => {
  const router = useRouter();
  const [favoriteArtists, setFavoriteArtists] = useState([]);

  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    try {
      const storedFavoriteArtists =
        JSON.parse(localStorage.getItem("favoriteArtists")) || [];
      setFavoriteArtists(storedFavoriteArtists);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const removeFavorite = (id) => {
    const updatedFavoriteArtists = favoriteArtists.filter((f) => f.id !== id);
    setFavoriteArtists(updatedFavoriteArtists);

    try {
      localStorage.setItem(
        "favoriteArtists",
        JSON.stringify(updatedFavoriteArtists)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedFavoriteArtists =
      JSON.parse(localStorage.getItem("favoriteArtists")) || [];
    if (
      JSON.stringify(favoriteArtists) !== JSON.stringify(storedFavoriteArtists)
    ) {
      setFavoriteArtists(storedFavoriteArtists);
    }
  }, [favoriteArtists]);

  return (
    <MainLayout>
      <div className={styles.FavoriteArtistPage}>
        <div className={styles.Navbar}>
          <Navbar title={"Your favourite Artists"} />
        </div>
        {favoriteArtists.length > 0 ? (
          <div className={styles.Artists}>
            {favoriteArtists.map((favArtist) => (
              <Home_Page_ArtistItem
                key={favArtist.id}
                data={favArtist}
                albumIndex={data?.position}
                isHome={isHome}
                onRemoveFavorite={() => removeFavorite(favArtist.id)}
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

export default FavoriteArtist_Page;
