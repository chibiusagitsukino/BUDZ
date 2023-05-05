import Image from "next/image";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { sliderArray } from "../../pages/api/mock.js";

const Hero = () => {
  const [slider, setSlider] = useState(0);

  const clickDot = (i) => {
    setSlider(i);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlider((prev) => {
        if (prev < sliderArray.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.Hero}>
      <div className={styles.hero_content}>
        <div className={styles.content_img}>
          <Image
            src={sliderArray[slider].image}
            fill
            sizes="(min-width: 1000px) 100%"
            alt="image-hero"
            priority="false"
          />
          <p>{sliderArray[slider].title}</p>
        </div>
        <div className={styles.dots}>
          <div
            onClick={() => clickDot(0)}
            className={slider === 0 ? styles.dot_trasform : styles.dot}
          ></div>
          <div
            onClick={() => clickDot(1)}
            className={slider === 1 ? styles.dot_trasform : styles.dot}
          ></div>
          <div
            onClick={() => clickDot(2)}
            className={slider === 2 ? styles.dot_trasform : styles.dot}
          ></div>
          <div
            onClick={() => clickDot(3)}
            className={slider === 3 ? styles.dot_trasform : styles.dot}
          ></div>
          <div
            onClick={() => clickDot(4)}
            className={slider === 4 ? styles.dot_trasform : styles.dot}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
