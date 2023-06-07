// Exporting module: UI (DOM selectors)
const getEl = (s) => document.querySelector(s);
const dom = {
  // *****Variables**
  // Elements
  parentWrapper: getEl(".wrapper"),
  textBoxTemplate: getEl(".text-box-template"),
  tape: getEl(".tape"),
  parentSets: getEl(".sets-container"),
  setTemplate: getEl(".set-template"),
  formEditTemplate: getEl(".form-edit-template"),
  dropdown: getEl("#dropdown"),
  leftBox: getEl(".left-box"),
  leftBoxAlt: getEl(".left-box-alternative"),
  rightBox: getEl(".right-box"),
  addCardForm: getEl(".create-new-form"),
  cardBody: getEl(".card-body"),
  body: getEl("body"),
  textBox: document.querySelectorAll(".text-box"),
  // Submit
  inputQ: getEl(".q"),
  inputA: getEl(".a"),
  inputSet: getEl(".set-name"),
  btnCancelEdits: getEl(".btn-cancel-edits"),

  // Notifications
  confirmation: getEl(".confirmation"),
  noticeDialog: getEl(".notice-dialog"),

  // Functions
  displayNotice(str) {
    const text = this.noticeDialog.querySelector("p");
    text.textContent = str;
    this.noticeDialog.showModal();
  },

  closeDialog() {
    this.confirmation.close();
    this.noticeDialog.close();
  },

  displayConfirmationDelSet(set) {
    this.confirmation.value = set;
    this.confirmation.showModal();
  },
};

export default dom;
