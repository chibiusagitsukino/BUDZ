import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import Artist_Page_TrackItem from "@/components/artist_page_trackItem";
import styles from "../pages/shuffle_page/styles.module.scss";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
export default function ShufflePage({ dataFirstShuffle,dataSecondShuffle,dataThirdShuffle }) {
  const router = useRouter();
  

  const single_track = (item) => {
    router.push(`/track_page/${item.id}`);
  };

  return (
    <MainLayout>
      <div className={styles.shuffle_page}>
      <Navbar title={"Shuffle"} />
      <div className={styles.track_list_container}>
        
        <div className={styles.track_list}>
          {dataFirstShuffle?.data.map((data, i) => (
            <div key={i} className={styles.track_item}>
              <Artist_Page_TrackItem
                data={data}
                key={i}
                action={single_track}
              />
            </div>
          ))}
        </div>
        <div className={styles.track_list}>
          {dataSecondShuffle?.data.map((data, i) => (
            <div key={i} className={styles.track_item}>
              <Artist_Page_TrackItem
                data={data}
                key={i}
                action={single_track}
              />
            </div>
          ))}
        </div>
        <div className={styles.track_list}>
          {dataThirdShuffle?.data.map((data, i) => (
            <div key={i} className={styles.track_item}>
              <Artist_Page_TrackItem
                data={data}
                key={i}
                action={single_track}
              />
            </div>
          ))}
        </div>
      </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const resFirstShuffle = await fetch("https://api.deezer.com/user/5277344544/flow");
  const resSecondShuffle = await fetch("https://api.deezer.com/user/5331777944/flow");
  const resThirdShuffle = await fetch("https://api.deezer.com/user/5331777944/flow");


  const dataFirstShuffle = await resFirstShuffle.json();
  const dataSecondShuffle = await resSecondShuffle.json();
  const dataThirdShuffle = await resThirdShuffle.json();

  return {
    props: {
      dataFirstShuffle,dataSecondShuffle,dataThirdShuffle
    },
  };
}

// const playTrack = (trackUrl, index) => {
//   if (index === playingTrackIndex) {
//     if (currentTrack.paused) {
//       currentTrack.play();
//     } else {
//       currentTrack.pause();
//     }
//     return;
//   }

//   if (currentTrack) {
//     currentTrack.pause();
//   }

//   const audio = new Audio(trackUrl);

//   audio.addEventListener("ended", () => {
//     setPlayingTrackIndex(null);
//   });

//   audio.play();
//   setCurrentTrack(audio);
//   setPlayingTrackIndex(index);
// };

////

//   const playTrack = (trackUrl, index) => {
//     if (playingTrackIndex === index) {
//       if (currentTrack.paused) {
//         currentTrack.play();
//       } else {
//         currentTrack.pause();
//       }
//     } else {
//       if (currentTrack) {
//         currentTrack.pause();
//       }
//       const audio = new Audio(trackUrl);
//       audio.onended = () => {
//         setPlayingTrackIndex(null);
//       };
//       audio.play();
//       setCurrentTrack(audio);
//       setPlayingTrackIndex(index);
//     }
// };

/////

// const playTrack = (trackUrl, index) => {
//   if (playingTrackIndex === index) {
//     if (currentTrack.paused) {
//       currentTrack.play();
//     } else {
//       currentTrack.pause();
//     }
//   } else {
//     if (currentTrack) {
//       currentTrack.pause();
//     }
//     const audio = new Audio(trackUrl);
//     audio.onended = () => {
//       setPlayingTrackIndex(null);
//     };
//     audio.play();
//     setCurrentTrack(audio);
//     setPlayingTrackIndex(index);
//   }
// };
