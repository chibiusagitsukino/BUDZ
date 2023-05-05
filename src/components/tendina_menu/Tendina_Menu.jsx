import { BiFolder, BiHeart, BiShuffle, BiStar, BiUserX } from "react-icons/bi";
import logo from "../../../public/logo/cuffie.png";
import Image from "next/image";
import styles from "./index.module.scss";
import Link from "next/link";

const Tendina_Menu = ({ tendina, onHandleLogout }) => {
  return (
    <div className={`${styles.Tendina_Menu} ${tendina && styles.show}`}>
      <div className={styles.header_logo}>
        <div className={styles.containerLogo} >
        <div className={styles.logo}>
        <Image src={logo} height={40} width={45} alt={"logo"} />
        </div>
        </div>
        <BiUserX onClick={onHandleLogout} className={styles.icon} />
      </div>

      <div className={styles.content}>
        <Link className={styles.box} href="/favouriteAlbum_page">
          <BiFolder className={styles.icon} />
          <p>Album</p>
        </Link>

        <Link className={styles.box} href="/favoriteTrack_page">
          <BiHeart className={styles.icon} />
          <p>Favorites</p>
        </Link>

        <Link className={styles.box} href="/shuffle_page">
          <BiShuffle className={styles.icon} />
          <p>Shuffle</p>
        </Link>

        <Link className={styles.box} href="/favoriteArtist_page">
          <BiStar className={styles.icon} />
          <p>Artist</p>
        </Link>
      </div>
    </div>
  );
};
export default Tendina_Menu;
