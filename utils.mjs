// Exporting module: State manager&keeper

import dom from "./dom.mjs";
function closeAllScreens() {
  dom.cardDisplayed.classList.add("hidden");
  dom.decksDisplayed.classList.add("hidden");
  dom.addCardParent.classList.add("hidden");
  dom.addDeckParent.classList.add("hidden");
}

function format(word) {
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = word.slice(1);
  return firstLetterCap + remainingLetters;
}

export default {
  closeAllScreens,
  format,
};
