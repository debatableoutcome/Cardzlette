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
  console.log(obj[0].set);
  const pairs = obj[0].cards;

  if (mode === "consecutive") {
    return renderTape(pairs, set);
  }
  if (mode === "random") {
    const randomPairs = utils.shuffle(pairs);
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
    console.log(set);
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

function displayToggleTimer(event) {
  const textBox = event.target.closest(".text-box");
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
  const index = state.dictionary.findIndex((s) => s.set === set);
  const pair = [question, answer];
  state.dictionary[index].cards.push(pair);
};

function submitNewCard() {
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

function submitNewSet() {
  const set = dom.inputSet.value.toLowerCase();
  dom.inputSet.value = "";

  dom.leftBox.classList.add("invisible");
  dom.leftBoxAlt.classList.add("invisible");
  dom.rightBox.classList.remove("invisible");

  addSet(set);
  dom.displayNotice("The set successfully added!");
}

function deleteCard(event) {
  const target = event.target;
  const set = dom.tape.dataset.set;
  const textBox = target.closest(".text-box");
  const question = textBox.querySelector(".question").textContent;
  const answer = textBox.querySelector(".answer").textContent;
  const pair = [question, answer];
  // Find the set
  const indexOfSet = state.dictionary.findIndex((s) => s.set === set);

  // Delete the card
  state.dictionary[indexOfSet].cards = state.dictionary[
    indexOfSet
  ].cards.filter((i) => !(i[0] === pair[0] && i[1] === pair[1]));
  // hide card

  textBox.classList.add("invisible");
  dom.cardBody.scrollBy(0, 200);
}

//-------------------------
function replacePair(obj) {
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

function removeDisable(event) {
  const target = event.target;

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
}

function addDisable(event) {
  const target = event.target;
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
}

function confirmSetDeletion(event) {
  const set = event.target.parentElement.parentElement.dataset.set
    .trim()
    .toLowerCase();
  deleteSet(set);
  dom.closeDialog();
  dom.displayNotice("The set has been permanently deleted");
}

function editsSubmit(event) {
  const target = event.target;
  event.preventDefault();

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
}

function editCard(event) {
  // Retrieve the text
  const parent = event.target.closest(".text-box");
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

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Event Listeners  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

window.addEventListener("DOMContentLoaded", () => {
  renderSetsList();
});

// Notifications (dialogs)
dom.body.addEventListener("click", function (event) {
  const target = event.target;
  // CLOSE DIALOG
  if (target.classList.contains("close-dialog-btn")) {
    dom.closeDialog();
  }
  // DELETE SET CONFIRMATION
  if (target.classList.contains("yes-delete-btn")) {
    confirmSetDeletion(event);
  }
});

dom.parentWrapper.addEventListener("click", function (event) {
  const target = event.target;
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
      // hideAnswer(target);
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
    displayToggleTimer(event);
  }

  // ADD CARD
  if (target.classList.contains("btn-add-card")) {
    dom.leftBox.classList.remove("invisible");
    dom.rightBox.classList.add("invisible");
  }
  // ADD SET
  if (target.classList.contains("btn-add-set")) {
    dom.leftBoxAlt.classList.remove("invisible");
    dom.rightBox.classList.add("invisible");
  }
  // CLOSE ADD SET BOX
  if (target.classList.contains("fa-xmark")) {
    dom.leftBoxAlt.classList.add("invisible");
    dom.leftBox.classList.add("invisible");
    dom.rightBox.classList.remove("invisible");
  }
  // DELETE SET
  if (
    target.classList.contains("set-del") ||
    target.classList.contains("btn-set-delete")
  ) {
    const div = target.closest(".set");
    const set = div.textContent;
    dom.displayConfirmationDelSet(set.trim().toLowerCase());
  }
  // DELETE CARD
  if (
    target.classList.contains("card-del") ||
    target.classList.contains("btn-delete-card")
  ) {
    deleteCard(event);
  }
  // EDIT CARD
  if (
    target.classList.contains("btn-edit") ||
    target.classList.contains("fa-pen-to-square")
  ) {
    editCard(event);
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
    submitNewCard();
  }

  if (submitType === "add-set") {
    if (dom.inputSet.value === "") return;
    submitNewSet();
  }
});

// FORM SUBMIT FOR CARD EDITS
dom.cardBody.addEventListener("submit", (event) => editsSubmit(event));

// FORM FOCUS/FOCUSOUT
// FORMS ACTIVE - REST BLOCKED
dom.parentWrapper.addEventListener("focusin", (event) => addDisable(event));

// FORMS NONACTIVE - REST ACTIVE
dom.parentWrapper.addEventListener("focusout", (event) => removeDisable(event));

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

//UI:

// If the list is empty display This set is empty + a button to add a card: ok cancel

//BUGS:
// display answer by clicking on the textbox
// Submit edits card - fix size of a field

// Notice to style cute
// adding a card, then cancel - clean fields before

// REF:

//DONE TODAY:
// Listeners
// buttons flip should be only active when the set is on *
