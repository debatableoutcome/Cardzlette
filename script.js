"use strict";

import dom from "./dom.mjs";
import store from "./store.mjs";
import state from "./state.mjs";
import utils from "./utils.mjs";

//%%%%%%%%%%%%%%%%%%%%%%%%%%%  Business Logic  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function renderSet(set) {
  console.log(set);
  const curArray = state.dictionary[set];
  console.log(curArray);
  const pairs = Object.entries(curArray);
  return renderTape(pairs);
}

function renderTape(pairs) {
  dom.tape.innerHTML = "";
  pairs.forEach((pair) => {
    const div = dom.textBoxTemplate.cloneNode(true);
    div.classList.remove("text-box-template");
    console.log(div);
    const question = div.querySelector(".question");
    console.log(question);
    question.textContent = pair[0];
    console.log(question.textContent);
    const answer = div.querySelector(".answer");
    answer.textContent = pair[1];
    console.log(answer.textContent);
    div.classList.remove("invisible");
    dom.tape.appendChild(div);
  });
}

const addCard = (question, answer, set) =>
  (state.dictionary[set][question] = answer);

function renderSets(sets) {
  console.log(sets);
  sets.forEach((set) => {
    // create a div
    const formatted = utils.format(set);
    const div = dom.setTemplate.cloneNode(true);
    div.textContent = formatted;
    div.classList.remove("set-template");
    div.classList.remove("invisible");
    dom.parentSets.appendChild(div);
  });
}

function renderSetsList() {
  const sets = Object.keys(state.dictionary);
  renderSets(sets);
  return displayDropdown(sets);
}

function displayDropdown(sets) {
  sets.forEach((s) => {
    let option = document.createElement("option");
    option.setAttribute("value", s);
    let optionText = document.createTextNode(s);
    option.appendChild(optionText);
    dom.dropdown.appendChild(option);
  });
}

// Browse decks
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
    const set = target.textContent.toLowerCase();
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
});

dom.addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target;
  if (dom.inputQ.value === "" || dom.inputA.value === "") return;

  const q = dom.inputQ.value.toLowerCase();
  const a = dom.inputA.value.toLowerCase();
  const set = dom.dropdown.value.toLowerCase();
  dom.leftBox.classList.add("invisible");

  dom.leftBoxAlt.classList.remove("invisible");

  addCard(q, a, set);
});
