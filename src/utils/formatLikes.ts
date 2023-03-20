export interface ISuffixes {
  [index: number]: "" | "k" | "m" | "b" | "t";
  length: number;
}

const suffixes: ISuffixes = ["", "k", "m", "b", "t"];

function formatLikes(likes: string) {
  let value = parseInt(likes);
  let suffixIndex;
  for (
    suffixIndex = 0;
    value >= 1000 && suffixIndex < suffixes.length - 1;
    suffixIndex++
  ) {
    value /= 1000;
  }
  let suffix = suffixes[suffixIndex];
  let formattedLikes: number | string = Math.round(value * 10) / 10;
  if (formattedLikes % 1 === 0) {
    formattedLikes = formattedLikes.toString();
  } else {
    formattedLikes = formattedLikes.toFixed(1);
  }
  return formattedLikes + suffix;
}

export default formatLikes;
