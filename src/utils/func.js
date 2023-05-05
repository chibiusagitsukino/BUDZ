// const minuteToSeconds = (minute) => {
//     const sec = minute / 60;
//     return sec;
//   };

export const shortDescription = (str) =>
  str.split(" ").splice(0, 3).join(" ") + "...";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

const secondsToMinutes = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  return result;
};

export { secondsToMinutes, padTo2Digits };
