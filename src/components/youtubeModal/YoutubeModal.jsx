import styles from "./index.module.scss";

const YoutubeModal = ({ youtubeId, closeModalYoutube }) => {
  return (
    <div className={styles.overlay} onClick={closeModalYoutube}>
      <div className={styles.YoutubeModal}>
        <p onClick={closeModalYoutube}>close</p>
        <iframe
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&showinfo=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeModal;
