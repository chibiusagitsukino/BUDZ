import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import Navbar from "@/components/navbar";
import styles from "./styles.module.scss";
import Album_Page_AlbumItem from "@/components/album_page_albumItem";
import Home_Page_TrackItem from "@/components/home_page_trackItem";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useState } from "react";

export default function Search_page({ albumData }) {

  const [isAlbumPage, setIsAlbumPage] = useState(true)
  
  const [player, setPlayer] = useState(false);

  const onHandleShowPlayer = () => {
    setPlayer(true);
  };

  const onHandleHidePlayer = () => {
    setPlayer(false);
  };
  return (
    <MainLayout>
      <div
        className={styles.AlbumPage}
        style={{ backgroundImage: `url(${albumData?.cover_xl})` }}
      >
        <div className={styles.container}>
          <Navbar title={"Album"} />
          {player && (
            <div className={styles.deezerPlayer}>
              <iframe
                title="deezer-widget"
                src={`https://widget.deezer.com/widget/dark/album/${albumData.id}?tracklist=false`}
                width="100%"
                height="130"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media; clipboard-write"
              ></iframe>
              <div className={styles.closePlayer} onClick={onHandleHidePlayer}>
                x
              </div>
            </div>
          )}
          <div className={styles.albumItem}>
            <Album_Page_AlbumItem data={albumData} isAlbumPage={isAlbumPage}/>
          </div>
          <div className={styles.titles}>
            <h2>Tracks </h2>
            <div className={styles.buttonPlayer} onClick={onHandleShowPlayer}>
              <div className={styles.buttonIcon}>
                <BsFillPlayCircleFill />
              </div>
              <h3>Listen now to all the tracks!</h3>
            </div>
          </div>

          <div className={styles.trackItem}>
            {albumData?.tracks.data.map((data, i) => (
              <Home_Page_TrackItem key={i} data={data} trackIndex={i} isAlbumPage={isAlbumPage} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const resAlbum = await fetch(
    `https://api.deezer.com/album/${context.query.album_id}`
  );

  const albumData = await resAlbum.json();

  return {
    props: {
      albumData,
    },
  };
}
