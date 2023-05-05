import styles from "./index.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const Genre_Page_GenreItem = ({ data, setSelectValue }) => {
  const router = useRouter();

  const reload = (item) => {
    router.push(`/radio_page/${data?.radios[0].id}`);
    setSelectValue(data?.title);
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${data?.radios[0].picture_medium})` }}
      onClick={reload}
    >
      <p className={styles.text}> {data?.title}</p>
    </div>
  );
};

export default Genre_Page_GenreItem;
