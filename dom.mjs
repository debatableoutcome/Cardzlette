// Exporting module: UI (DOM selectors)
// *****Variables********
const getEl = (s) => document.querySelector(s);
// Elements
const parentWrapper = getEl(".wrapper");
const textBoxTemplate = getEl(".text-box-template");
const tape = getEl(".tape");
const parentSets = getEl(".sets-container");
const setTemplate = getEl(".set-template");
const dropdown = getEl("#dropdown");
const leftBox = getEl(".left-box");
const leftBoxAlt = getEl(".left-box-alternative");
const rightBox = getEl(".right-box");
const addCardForm = getEl(".create-new-form");
const cardBody = getEl(".card-body");

// Submit
const inputQ = getEl(".q");
const inputA = getEl(".a");

export default {
  parentWrapper,
  textBoxTemplate,
  tape,
  parentSets,
  setTemplate,
  dropdown,
  rightBox,
  leftBox,
  inputQ,
  inputA,
  addCardForm,
  cardBody,
  leftBoxAlt,
};
