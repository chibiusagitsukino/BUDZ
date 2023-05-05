import styles from "./index.module.scss";
import Image from "next/image";
import { BiUser } from "react-icons/bi";

const Artist_Page_TrackItem = ({ data, action }) => {
  return (
    <div className={styles.container} onClick={() => action(data)}>
      <Image
        src={data?.album.cover_medium}
        alt={data?.title}
        width={120}
        height={120}
      />
      <div className={styles.text}>
        <h4>{data?.title}</h4>
        {!data?.contributors? 
        <div className={styles.contentArtist}>
        <BiUser className={styles.icon} />
        <p className={styles.artist}>{data?.artist.name}</p>
      </div>
      : null}
        <p  className={styles.albumTitle} >{`Album: ${data?.album.title}` }</p>
      
      </div>
    </div>
  );
};

export default Artist_Page_TrackItem;
