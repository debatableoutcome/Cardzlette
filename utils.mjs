// Exporting module: State manager&keeper

import dom from "./dom.mjs";

const utils = {
  closeAllScreens() {
    dom.cardDisplayed.classList.add("hidden");
    dom.decksDisplayed.classList.add("hidden");
    dom.addCardParent.classList.add("hidden");
    dom.addDeckParent.classList.add("hidden");
  },

  format(word) {
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);
    return firstLetterCap + remainingLetters;
  },
  //  Fisher-Yates (also known as Knuth) shuffle algorithm
  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
};

export default utils;
