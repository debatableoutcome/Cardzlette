"use strict";
// CARDZLETTE

import dom from "./dom.mjs";
import store from "./store.mjs";
import state from "./state.mjs";
import utils from "./utils.mjs";

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Business Logic  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//--------------------------------
function renderSet(set, mode = "consecutive") {
  console.log(set);
  const obj = state.dictionary.filter((obj) => obj.set === set);
  const pairs = obj[0].cards;
  if (mode === "consecutive") {
    return renderTape(pairs, set);
  }
  if (mode === "random") {
    const randomPairs = utils.shuffle(pairs);
    console.log(randomPairs);
    return renderTape(randomPairs, set);
  }
}

//&&&&&&&&&&&&&&&&&&&&&&&&& RENDERS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//-----------------------
function renderTape(pairs, set) {
  if (!pairs.length) {
    dom.displayNotice("This set is empty yet");
  }
  dom.tape.innerHTML = "";

  pairs.forEach((pair) => {
    const div = dom.textBoxTemplate.cloneNode(true);
    div.classList.remove("text-box-template");
    // div.dataset.set = set;
    const question = div.querySelector(".question");
    question.textContent = pair[0];
    question.dataset.original = pair[0];
    const answer = div.querySelector(".answer");
    answer.textContent = pair[1];
    answer.dataset.original = pair[1];
    div.classList.remove("invisible");
    dom.tape.appendChild(div);
    dom.tape.classList.remove("invisible");
    dom.tape.dataset.set = set;
  });
  // Wake flip buttons up
  dom.flipBtnsState("wake");
}

function renderSets(sets) {
  sets.forEach((set) => {
    // create a div
    const formatted = utils.format(set);
    const div = dom.setTemplate.cloneNode(true);
    div.childNodes[0].textContent = formatted;
    div.value = formatted;
    div.classList.remove("set-template");
    div.classList.remove("invisible");
    dom.parentSets.appendChild(div);
  });
}

function renderError() {}
function renderSetsList() {
  const sets = state.dictionary.map((set) => set.set);
  dom.parentSets.innerHTML = "";
  renderSets(sets);
  console.log(sets);
  return displayDropdown(sets);
}

function displayDropdown(sets) {
  dom.dropdown.innerHTML = "";
  sets.forEach((s) => {
    let option = document.createElement("option");
    option.dataset.set = s;
    let optionText = document.createTextNode(s);
    option.appendChild(optionText);
    dom.dropdown.appendChild(option);
  });
}

function timerDisplayAnswer(question, answer, ms) {
  setTimeout(() => {
    answer.classList.add("invisible");
    question.classList.remove("invisible");
  }, ms);
}

//&&&&&&&&&&&&&&&&&&&&&&& MANIPULATIONS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
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
  state.dictionary = state.dictionary.filter((item) => item.set !== set);
  renderSetsList();
};

const addCard = (question, answer, set) => {
  console.log(question, answer, set);
  const index = state.dictionary.findIndex((s) => s.set === set);
  const pair = [question, answer];
  state.dictionary[index].cards.push(pair);
};

function deleteCard(pair, set) {
  // Find the set
  const indexOfSet = state.dictionary.findIndex((s) => s.set === set);

  // Delete the card
  state.dictionary[indexOfSet].cards = state.dictionary[
    indexOfSet
  ].cards.filter((i) => !(i[0] === pair[0] && i[1] === pair[1]));
}

//-------------------------
function replacePair(obj) {
  console.log(obj);
  // find the required set
  const indexOfSet = state.dictionary.findIndex((s) => s.set === obj.set);
  // find the edited pair
  const toBeReplaced = state.dictionary[indexOfSet].cards.findIndex(
    (w) => w[0] === obj.previousKey
  );
  // replace the pair
  state.dictionary[indexOfSet].cards[toBeReplaced][0] = obj.newA;
  state.dictionary[indexOfSet].cards[toBeReplaced][1] = obj.newB;
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Event Listeners  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

window.addEventListener("DOMContentLoaded", () => {
  renderSetsList();
});

// Notifications (dialogs)
dom.body.addEventListener("click", function (event) {
  const target = event.target;
  // CLOSE DIALOG
  if (target.classList.contains("close-dialog-btn")) {
    console.log(target);
    dom.closeDialog();
  }
  // DELETE SET CONFIRMATION
  if (target.classList.contains("yes-delete-btn")) {
    const set = target.parentElement.parentElement.dataset.set
      .trim()
      .toLowerCase();
    deleteSet(set);
    dom.closeDialog();
    dom.displayNotice("The set has been permanently deleted");
  }
});

dom.parentWrapper.addEventListener("click", function (event) {
  const target = event.target;
  console.log(target);
  // SHIFT LEFT
  if (
    target.classList.contains("arrow-left") ||
    target.classList.contains("fa-chevron-left")
  ) {
    dom.cardBody.scrollBy(0, -200);
  }
  // SHIFT RIGHT
  if (
    target.classList.contains("arrow-right") ||
    target.classList.contains("fa-chevron-right")
  ) {
    if (
      dom.cardBody.scrollTop + dom.cardBody.clientHeight >=
      dom.cardBody.scrollHeight
    ) {
      hideAnswer(target);
      // Infinite scroll to the right
      dom.cardBody.scrollTop = 0;
    } else {
      dom.cardBody.scrollBy(0, 200);
    }
  }
  if (target.classList.contains("set")) {
    const textEl = target.closest(".set");
    const set = textEl.textContent.toLowerCase().trim();
    return renderSet(set);
  }

  if (
    // TOGGLE answer / quesion with timer
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
      timerDisplayAnswer(question, answer, 3000);
    } else {
      answer.classList.add("invisible");
      question.classList.remove("invisible");
    }
  }
  // ADD CARD
  if (target.classList.contains("btn-add-card")) {
    console.log(target);
    console.log(dom.leftBox.classList);
    dom.leftBox.classList.remove("invisible");
    console.log(dom.leftBox.classList);
    dom.rightBox.classList.add("invisible");
  }
  // ADD SET
  if (target.classList.contains("btn-add-set")) {
    console.log(target);
    dom.leftBoxAlt.classList.remove("invisible");
    dom.rightBox.classList.add("invisible");
  }
  // CLOSE ADD SET BOX
  if (target.classList.contains("fa-xmark")) {
    console.log(target);
    dom.leftBoxAlt.classList.add("invisible");
    dom.leftBox.classList.add("invisible");
    dom.rightBox.classList.remove("invisible");
  }
  // DELETE SET
  if (
    target.classList.contains("set-del") ||
    target.classList.contains("btn-set-delete")
  ) {
    console.log(target);
    const div = target.closest(".set");
    const set = div.textContent;
    dom.displayConfirmationDelSet(set.trim().toLowerCase());
  }
  // DELETE CARD
  if (
    target.classList.contains("card-del") ||
    target.classList.contains("btn-delete-card")
  ) {
    console.log(target);
    const set = dom.tape.dataset.set;
    const textBox = target.closest(".text-box");
    console.log(textBox);
    const question = textBox.querySelector(".question").textContent;
    const answer = textBox.querySelector(".answer").textContent;
    const pair = [question, answer];
    deleteCard(pair, set);
    // hide card
    textBox.classList.add("invisible");
    dom.cardBody.scrollBy(0, 200);
  }
  // EDIT CARD
  if (
    target.classList.contains("btn-edit") ||
    target.classList.contains("fa-pen-to-square")
  ) {
    // Retrieve the text
    const parent = target.closest(".text-box");
    const q = parent.querySelector(".question");
    const a = parent.querySelector(".answer");
    console.log(parent, q, a);
    const textA = q.textContent.trim();
    const textB = a.textContent.trim();
    console.log(textA, textB);

    // Create (clone the template and fill in) the form
    const form = dom.formEditTemplate.cloneNode(true);
    // Take text A and text B before editting
    const fieldA = form.querySelector(".fieldA");
    fieldA.value = textA;
    const fieldB = form.querySelector(".fieldB");
    fieldB.value = textB;
    const prevValues = String(textA, `:`, textB);

    form.classList.remove("invisible");
    form.classList.remove("form-edit-template");

    form.dataset.original = String(prevValues);

    // Hide All
    dom.tape.classList.add("invisible");
    // Nest the Form
    dom.cardBody.appendChild(form);
  }
  // RANDOMIZE
  if (
    target.classList.contains("btn-random") ||
    target.classList.contains("fa-shuffle")
  ) {
    const set = dom.tape.dataset.set;
    renderSet(set, "random");
  }
});

// FORM SUBMIT FOR ADD CARD OR SET
dom.addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitType = event.submitter.value;
  if (submitType === "add-card") {
    if (dom.inputQ.value === "" || dom.inputA.value === "") return;

    const q = dom.inputQ.value.toLowerCase();
    const a = dom.inputA.value.toLowerCase();
    const set = dom.dropdown.value.toLowerCase();
    dom.leftBox.classList.add("invisible");
    dom.leftBoxAlt.classList.add("invisible");
    dom.rightBox.classList.remove("invisible");
    dom.inputQ.value = "";
    dom.inputA.value = "";
    addCard(q, a, set);
    dom.displayNotice("The card successfully added!");
  }

  if (submitType === "add-set") {
    if (dom.inputSet.value === "") return;

    const set = dom.inputSet.value.toLowerCase();
    dom.inputSet.value = "";

    dom.leftBox.classList.add("invisible");
    dom.leftBoxAlt.classList.add("invisible");
    dom.rightBox.classList.remove("invisible");

    addSet(set);
    dom.displayNotice("The set successfully added!");
  }
});

// FORM SUBMIT FOR CARD EDITS
dom.cardBody.addEventListener("submit", (event) => {
  const target = event.target;
  event.preventDefault();
  console.log("hello submit");
  // retrieving data to be edited
  const fieldA = target.parentElement.querySelector(".fieldA");
  const fieldB = target.parentElement.querySelector(".fieldB");
  const formEdits = document.querySelector(".form-edit");
  const editedAB = {};
  editedAB.newA = fieldA.value;
  editedAB.newB = fieldB.value;
  editedAB.set = dom.tape.dataset.set;
  editedAB.previousKey = target.parentElement.dataset.original;

  dom.leftBox.classList.add("invisible");
  dom.leftBoxAlt.classList.add("invisible");
  dom.rightBox.classList.remove("invisible");

  replacePair(editedAB);
  formEdits.classList.add("invisible");
  renderSet(dom.tape.dataset.set);
});

// FORM FOCUS/FOCUSOUT
// FORMS ACTIVE - REST BLOCKED
dom.parentWrapper.addEventListener("focusin", (event) => {
  const target = event.target;
  console.log(target);
  if (
    target.classList.contains("fieldA") ||
    target.classList.contains("fieldB")
  ) {
    const btnLeft = document.querySelector(".arrow-left");
    const btnRight = document.querySelector(".arrow-right");
    dom.parentSets.classList.add("disabled");
    dom.rightBox.classList.add("disabled");
    btnLeft.classList.add("disabled");
    btnRight.classList.add("disabled");
  }
});
// FORMS NONACTIVE - REST ACTIVE
dom.parentWrapper.addEventListener("focusout", (event) => {
  const target = event.target;
  console.log(target);
  if (
    target.classList.contains("fieldA") ||
    target.classList.contains("fieldB")
  ) {
    const btnLeft = document.querySelector(".arrow-left");
    const btnRight = document.querySelector(".arrow-right");
    dom.parentSets.classList.remove("disabled");
    dom.rightBox.classList.remove("disabled");
    btnLeft.classList.remove("disabled");
    btnRight.classList.remove("disabled");
  }
});
// CANCEL CARD EDITS
dom.btnCancelEdits.addEventListener("click", (event) => {
  const form = event.target.closest(".form-edit");
  event.preventDefault();
  form.reset();
  form.remove();
});

// Amendments planned:

// FEATURES:

// local storage
// errors

//UI:

// If the list is empty display This set is empty + a button to add a card: ok cancel

//BUGS:
// Submit edits card - fix size of a field

// Notice is to style cute
// buttons flip should be only active when the set is on *
// adding a card, then cancel - clean fields before

// REF:

//DONE TODAY:
// size of text div
// overflow
