import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import Navbar from "@/components/navbar";
import Search_Page_Item from "@/components/search_page_item";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Search_page({ artistData, albumData, trackData }) {
  const artistRef = useRef(null);
  const albumRef = useRef(null);
  const tracksRef = useRef(null);
  const router = useRouter();

  let scrollArtist = 0;
  let scrollAlbum = 0;
  let scrollTracks = 0;

  const single_album = (item) => {
    router.push(`/album_page/${item.album.id}`);
  };
  const single_track = (item) => {
    router.push(`/track_page/${item.id}`);
  };
  const single_artist = (item) => {
    router.push(`/artist_page/${item.artist.id}`);
  };

  const forward = (refDiv, scrollItem) => {
    switch (scrollItem) {
      case "artist":
        if (scrollArtist < refDiv.current.scrollWidth) {
          scrollArtist += 400;
          refDiv.current.scrollLeft = scrollArtist;
        }
        break;
      case "album":
        if (scrollAlbum < refDiv.current.scrollWidth) {
          scrollAlbum += 400;
          refDiv.current.scrollLeft = scrollAlbum;
        }
        break;
      case "track":
        if (scrollTracks < refDiv.current.scrollWidth) {
          scrollTracks += 400;
          refDiv.current.scrollLeft = scrollTracks;
        }
        break;
    }
  };

  const back = (refDiv, scrollItem) => {
    switch (scrollItem) {
      case "artist":
        if (scrollArtist > 0) {
          scrollArtist -= 400;
          refDiv.current.scrollLeft = scrollArtist;
        }
        break;
      case "album":
        if (scrollAlbum > 0) {
          scrollAlbum -= 400;
          refDiv.current.scrollLeft = scrollAlbum;
        }
        break;
      case "track":
        if (scrollTracks > 0) {
          scrollTracks -= 400;
          refDiv.current.scrollLeft = scrollTracks;
        }
        break;
    }
  };

  return (
    <MainLayout>
      <Navbar title={"Budz"} />
      <div className={styles.content_category_page}>
        <div className={styles.box_container}>
          <h2>{`Results for '${router.query.query}' in Artists:`}</h2>
          {artistData.length > 0 && (
            <>
              <BiChevronLeft
                className={styles.btn_left}
                onClick={() => back(artistRef, "artist")}
              />

              <BiChevronRight
                className={styles.btn_right}
                onClick={() => forward(artistRef, "artist")}
              />
            </>
          )}
          <div className={styles.albumitem} ref={artistRef}>
            {artistData.length === 0 && <h4>No results</h4>}

            {artistData.map((item, i) => (
              <Search_Page_Item action={single_artist} item={item} key={i} />
            ))}
          </div>
        </div>
        <div className={styles.box_container}>
          <h2>{`Results for '${router.query.query}' in Albums:`}</h2>
          {albumData.length > 0 && (
            <>
              <BiChevronLeft
                className={styles.btn_left}
                onClick={() => back(albumRef, "album")}
              />

              <BiChevronRight
                className={styles.btn_right}
                onClick={() => forward(albumRef, "album")}
              />
            </>
          )}
          <div className={styles.albumitem} ref={albumRef}>
            {albumData.length === 0 && <h4>No results</h4>}

            {albumData.map((item, i) => (
              <Search_Page_Item action={single_album} item={item} key={i} />
            ))}
          </div>
        </div>
        <div className={styles.box_container}>
          <h2>{`Results for '${router.query.query}' in Tracks:`}</h2>
          {trackData.length > 0 && (
            <>
              <BiChevronLeft
                className={styles.btn_left}
                onClick={() => back(tracksRef, "track")}
              />

              <BiChevronRight
                className={styles.btn_right}
                onClick={() => forward(tracksRef, "track")}
              />
            </>
          )}
          <div className={styles.albumitem} ref={tracksRef}>
            {trackData.length === 0 && <h4>No results</h4>}

            {trackData.map((item, i) => (
              <Search_Page_Item action={single_track} item={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const resArtist = await fetch(
    `https://api.deezer.com/search?q=artist:"${context.query.query}"`
  );
  const resAlbum = await fetch(
    `https://api.deezer.com/search?q=album:"${context.query.query}"`
  );
  const resTrack = await fetch(
    `https://api.deezer.com/search?q=track:"${context.query.query}"`
  );
  const artistData = await resArtist.json();
  const albumData = await resAlbum.json();
  const trackData = await resTrack.json();

  return {
    props: {
      artistData: artistData.data,
      albumData: albumData.data,
      trackData: trackData.data,
    },
  };
}
