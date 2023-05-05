import styles from "./index.module.scss";
import Image from "next/image";

const Artist_Page_AlbumItem = ({ data, action }) => {
  return (
    <div className={styles.container} onClick={() => action(data)}>
      <Image
        src={data.cover_medium}
        alt={data.title}
        width={120}
        height={120}
      />
      <div className={styles.text}>
        <h4>{data.title}</h4>
        <p>{`Released on ${data.release_date}`}</p>
      </div>
    </div>
  );
};

export default Artist_Page_AlbumItem;
