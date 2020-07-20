export const padZero = (integer = 0) => {
  if (integer < 10) {
    return "0" + integer;
  }

  return integer.toString();
};

export const formatSecondsIntoString = (secondsInput = 0) => {
  // h:MM:SS
  const hours = Math.floor(secondsInput / 3600)
  const minutes = padZero(Math.floor((secondsInput - (hours * 3600)) / 60));
  const seconds = padZero(secondsInput - (hours * 3600) - (minutes * 60));
  return `${hours}:${minutes}:${seconds}`;
};