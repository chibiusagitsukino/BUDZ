import styles from "../pages/favoriteTrack_page/styles.module.scss";
import { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import Navbar from "@/components/navbar";
import Home_Page_TrackItem from "@/components/home_page_trackItem";

const FavoriteTrackPage = ({ data }) => {
  const [favorites, setFavorites] = useState([]);

  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Definisco una funzione per rimuovere un brano dai preferiti
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((f) => f.id !== id);
    setFavorites(updatedFavorites);

    // Salvo i dati dei brani preferiti in localStorage
    try {
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (JSON.stringify(favorites) !== JSON.stringify(storedFavorites)) {
      setFavorites(storedFavorites);
    }
  }, [favorites]);

  return (
    <MainLayout>
      <div className={styles.FavoriteTrackPage}>
        <div className={styles.Navbar}>
          <Navbar title={"Your favourite tracks"} />
        </div>
        {favorites.length > 0 ? (
          <div className={styles.tracks}>
            {favorites.map((favTrack, index) => (
              <Home_Page_TrackItem
                key={favTrack.id}
                data={favTrack}
                trackIndex={index}
                isHome={isHome}
                onRemoveFavorite={() => removeFavorite(favTrack.id)}
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

export default FavoriteTrackPage;
