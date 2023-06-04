// Exporting module: UI (DOM selectors)
// *****Variables********
const getEl = (s) => document.querySelector(s);
// Elements
const parentWrapper = getEl(".wrapper");
const textBoxTemplate = getEl(".text-box-template");
const tape = getEl(".tape");
const parentSets = getEl(".sets-container");
const setTemplate = getEl(".set-template");
const formEditTemplate = getEl(".form-edit-template");
const dropdown = getEl("#dropdown");
const leftBox = getEl(".left-box");
const leftBoxAlt = getEl(".left-box-alternative");
const rightBox = getEl(".right-box");
const addCardForm = getEl(".create-new-form");
const cardBody = getEl(".card-body");
const body = getEl("body");

// Submit
const inputQ = getEl(".q");
const inputA = getEl(".a");
const inputSet = getEl(".set-name");

// Notifications
const confirmation = getEl(".confirmation");
const noticeDialog = getEl(".notice-dialog");

// Functions
function displayNotice(str) {
  const text = noticeDialog.querySelector("p");
  text.textContent = str;
  noticeDialog.showModal();
}

function closeDialog() {
  confirmation.close();
  noticeDialog.close();
}
function displayConfirmationDelSet(set) {
  confirmation.value = set;
  confirmation.showModal();
}

export default {
  body,
  parentWrapper,
  textBoxTemplate,
  formEditTemplate,
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
  inputSet,
  confirmation,
  displayNotice,
  noticeDialog,
  closeDialog,
  displayConfirmationDelSet,
};
