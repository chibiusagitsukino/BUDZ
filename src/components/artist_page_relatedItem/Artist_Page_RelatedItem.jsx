import styles from "./index.module.scss";
import Image from "next/image";

const Artist_Page_RelatedItem = ({ data, action }) => {
  return (
    <div className={styles.container} onClick={() => action(data)}>
      <Image
        src={data.picture_medium}
        alt={data.name}
        width={120}
        height={120}
      />
      <div className={styles.text}>
        <h4>{data.name}</h4>
        <p>{`Album released: ${data.nb_album}`}</p>
        <p>{`Follwers: ${data.nb_fan}`}</p>
      </div>
    </div>
  );
};

export default Artist_Page_RelatedItem;
