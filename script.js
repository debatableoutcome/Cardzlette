"use strict";

import dom from "./dom.mjs";
import store from "./store.mjs";
import state from "./state.mjs";
import utils from "./utils.mjs";

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Business Logic  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//--------------------------------
function renderSet(set) {
  const obj = state.dictionary.filter((obj) => obj.set === set);
  const pairs = obj[0].cards;
  // const curArray = state.dictionary.filter((s) => {
  //   s.set === set;
  // });
  // const pairs = Object.entries(curArray);
  return renderTape(pairs, set);
}
//-----------------------
function renderTape(pairs, set) {
  // const id = Math.floor(Math.random() * 10000000);
  // console.log(id);
  dom.tape.innerHTML = "";
  console.log(dom.tape);
  pairs.forEach((pair) => {
    const div = dom.textBoxTemplate.cloneNode(true);
    div.classList.remove("text-box-template");
    div.value = set;
    const question = div.querySelector(".question");
    question.textContent = pair[0];
    question.value = pair[0];
    const answer = div.querySelector(".answer");
    answer.textContent = pair[1];
    answer.value = pair[1];
    div.classList.remove("invisible");
    dom.tape.appendChild(div);
    dom.tape.classList.remove("invisible");
    dom.tape.value = set;
  });
}
//----------------------------
const addCard = (question, answer, set) => {
  const index = state.dictionary.findIndex((s) => s.set === set);
  const pair = [question, answer];
  state.dictionary[index].cards.push(pair);
};
// (state.dictionary[set][question] = answer);
//----------
function renderSets(sets) {
  console.log(sets);
  sets.forEach((set) => {
    // create a div
    console.log(state.dictionary);
    const formatted = utils.format(set);
    const div = dom.setTemplate.cloneNode(true);
    div.childNodes[0].textContent = formatted;
    div.value = formatted;
    div.classList.remove("set-template");
    div.classList.remove("invisible");
    dom.parentSets.appendChild(div);
  });
}
//------------
function renderSetsList() {
  console.log(state.dictionary);
  const sets = state.dictionary.map((set) => set.set);
  console.log(sets);
  // const sets = Object.keys(state.dictionary);
  dom.parentSets.innerHTML = "";

  renderSets(sets);
  return displayDropdown(sets);
}
//--------------
function displayDropdown(sets) {
  dom.dropdown.innerHTML = "";
  sets.forEach((s) => {
    let option = document.createElement("option");
    option.setAttribute("value", s);
    let optionText = document.createTextNode(s);
    option.appendChild(optionText);
    dom.dropdown.appendChild(option);
  });
}
//-----------------
const addSet = (set) => {
  const obj = {
    set,
    cards: [],
  };
  state.dictionary.push(obj);
  renderSetsList();
};
//---------------------------
const deleteSet = (set) => {
  state.dictionary.filter((item) => item.set !== set);
  renderSetsList();
};

function deleteCard(pair, set) {
  // Find the set
  const indexOfSet = state.dictionary.findIndex((s) => s.set === set);

  // Delete the card
  state.dictionary[indexOfSet].cards = state.dictionary[
    indexOfSet
  ].cards.filter((i) => !(i[0] === pair[0] && i[1] === pair[1]));

  console.log(state.dictionary[indexOfSet].cards);
}

//-------------------------
function replacePair(obj) {
  console.log(obj);
  // find the set
  const indexOfSet = state.dictionary.findIndex((s) => s.set === obj.set);
  // find the edited pair
  const toBeReplaced = state.dictionary[indexOfSet].cards.findIndex(
    (w) => w[0] === obj.prevValueKey
  );
  // replace the pair
  state.dictionary[indexOfSet].cards[toBeReplaced][0] = obj.newA;
  state.dictionary[indexOfSet].cards[toBeReplaced][1] = obj.newB;
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Event Listeners  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

window.addEventListener("DOMContentLoaded", () => {
  renderSetsList();
});

dom.parentWrapper.addEventListener("click", function (event) {
  const target = event.target;
  console.log(target);
  console.log(event);

  if (
    target.classList.contains("arrow-left") ||
    target.classList.contains("fa-chevron-left")
  ) {
    if (state.counter === 0) return;
    state.counter--;
    console.log(state.counter);
    dom.cardBody.scrollBy(0, -200);
  }

  if (
    target.classList.contains("arrow-right") ||
    target.classList.contains("fa-chevron-right")
  ) {
    state.counter++;
    console.log(state.counter);
    dom.cardBody.scrollBy(0, 200);
  }
  if (target.classList.contains("set")) {
    console.log(target);
    const textEl = target.closest(".set");
    const pEl = textEl.querySelector(".text-name");
    console.log(textEl);
    const set = textEl.textContent.toLowerCase().trim();
    return renderSet(set);
  }

  if (
    // Toggle answer / quesion
    target.classList.contains("text-box") ||
    target.classList.contains("question") ||
    target.classList.contains("answer")
  ) {
    console.log(target);
    const textBox = target.closest(".text-box");
    const answer = textBox.querySelector(".answer");
    const question = textBox.querySelector(".question");

    if (answer.classList.contains("invisible")) {
      answer.classList.remove("invisible");
      question.classList.add("invisible");
    } else {
      answer.classList.add("invisible");
      question.classList.remove("invisible");
    }
  }
  if (target.classList.contains("btn-add-card")) {
    console.log(target);
    console.log(dom.leftBox.classList);
    dom.leftBox.classList.remove("invisible");
    console.log(dom.leftBox.classList);
    dom.rightBox.classList.add("invisible");
  }
  if (target.classList.contains("btn-add-set")) {
    console.log(target);
    dom.leftBoxAlt.classList.remove("invisible");
    dom.rightBox.classList.add("invisible");
  }

  if (target.classList.contains("fa-xmark")) {
    console.log(target);
    dom.leftBoxAlt.classList.add("invisible");
    dom.leftBox.classList.add("invisible");
    dom.rightBox.classList.remove("invisible");
  }
  if (target.classList.contains("fa-trash-can")) {
    if (target.parentElement.classList.contains("btn-set-delete")) {
      const text = target.parentElement.parentElement.value
        .trim()
        .toLowerCase();
      deleteSet(text);
    }
    if (target.parentElement.classList.contains("btn-del")) {
      const set = dom.tape.value;
      const textBox = target.parentElement.parentElement.parentElement;
      const question =
        target.parentElement.parentElement.parentElement.querySelector(
          ".question"
        ).textContent;
      const answer =
        target.parentElement.parentElement.parentElement.querySelector(
          ".answer"
        ).textContent;
      const pair = [question, answer];
      deleteCard(pair, set);
      // hide card
      textBox.classList.add("invisible");
      dom.cardBody.scrollBy(0, 200);
      // delete this current ui card
    }
    if (
      // Handle card's editting
      target.classList.contains("btn-edit") ||
      target.classList.contains("fa-pen-to-square")
    ) {
      // Retrieve the text
      const parent = target.closest(".text-box");
      const q = parent.querySelector(".question");
      const a = parent.querySelector(".answer");
      const textA = q.textContent.trim();
      const textB = a.textContent.trim();

      // Create (clone and fill in) the form
      const form = dom.formEditTemplate.cloneNode(true);
      // Text A and text B before editting
      const fieldA = form.querySelector(".fieldA");
      fieldA.value = textA;
      const fieldB = form.querySelector(".fieldB");
      fieldB.value = textB;
      const prevValues = String(textA, `:`, textB);
      // Setting initial values to a button

      form.classList.remove("invisible");
      form.classList.remove("form-edit-template");

      form.value = String(prevValues);

      // Hide All
      dom.tape.classList.add("invisible");
      // Nest the Form
      dom.cardBody.appendChild(form);
    }
  }
});

dom.addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target;
  const submitType = event.submitter.value;
  if (submitType === "add-card") {
    console.log(target);

    if (dom.inputQ.value === "" || dom.inputA.value === "") return;

    const q = dom.inputQ.value.toLowerCase();
    const a = dom.inputA.value.toLowerCase();
    const set = dom.dropdown.value.toLowerCase();
    dom.leftBox.classList.add("invisible");
    dom.leftBoxAlt.classList.add("invisible");
    dom.rightBox.classList.remove("invisible");

    addCard(q, a, set);
  }

  if (submitType === "add-set") {
    console.log("submit-set", target);

    if (dom.inputSet.value === "" || dom.inputSet.value === "") return;

    const set = dom.inputSet.value.toLowerCase();
    dom.inputSet.value = "";

    dom.leftBox.classList.add("invisible");
    dom.leftBoxAlt.classList.add("invisible");
    dom.rightBox.classList.remove("invisible");

    addSet(set);
  }
});

dom.cardBody.addEventListener("submit", (event) => {
  const target = event.target;

  console.log(target.value);
  event.preventDefault();
  console.log("submit-edits", target.parentElement.value);
  // retrieving data to be edited
  const fieldA = target.parentElement.querySelector(".fieldA");
  const fieldB = target.parentElement.querySelector(".fieldB");
  const formEdits = document.querySelector(".form-edit");
  const editedAB = {};
  editedAB.newA = fieldA.value;
  editedAB.newB = fieldB.value;
  editedAB.set = dom.tape.value;
  editedAB.prevValueKey = target.parentElement.value;

  dom.leftBox.classList.add("invisible");
  dom.leftBoxAlt.classList.add("invisible");
  dom.rightBox.classList.remove("invisible");

  replacePair(editedAB);
  formEdits.classList.add("invisible");
  renderSet(dom.tape.value);
});
// Amendments planned:
//features:
// local storage implement

// when saving a card notify that it has been successfully saved
//when deleting a card notify that it has been successfully saved

// If the list is empty display This set is empty + a button to add a card: ok cancel
// randomise mode;
//bugs to fix:
// api remove
