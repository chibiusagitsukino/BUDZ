import styles from "./index.module.scss";
import Image from "next/image";



const Home_Page_RadioItem = ({ data }) => {
  return (
    <div className={styles.container}>
     <p className={styles.item}> {data?.title}</p>
       </div>
  );
};

export default Home_Page_RadioItem;
