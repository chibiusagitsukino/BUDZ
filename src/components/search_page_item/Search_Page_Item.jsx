import Image from "next/image";
import { shortDescription } from "@/utils/func";
import styles from "./index.module.scss";

const Search_Page_Item = ({ item, action }) => {
  return (
    <div className={styles.container} onClick={() => action(item)}>
      <Image
        src={item.album.cover_medium}
        width={120}
        height={120}
        alt={item.album.title}
      />
      <div className={styles.text}>
        <h4 className={styles.name_artist}>{item.artist.name}</h4>
        <p className={styles.title_album}>
          {shortDescription(item.album.title)}
        </p>
      </div>
    </div>
  );
};
export default Search_Page_Item;
