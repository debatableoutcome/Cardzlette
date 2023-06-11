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
  flipRight: getEl(".arrow-right"),
  flipLeft: getEl(".arrow-left"),
  iconFlipRight: getEl(".icon-right"),
  iconFlipLeft: getEl(".icon-left"),

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

  flipBtnsState(state) {
    if (state === "wake") {
      this.flipLeft.disabled = false;
      this.flipRight.disabled = false;
      this.flipLeft.classList.remove("arrow-sleep");
      this.flipRight.classList.remove("arrow-sleep");
      this.iconFlipLeft.classList.remove("flip-icon-sleep");
      this.iconFlipRight.classList.remove("flip-icon-sleep");
    }
    if (state === "sleep") {
      this.flipLeft.disabled = true;
      this.flipRight.disabled = true;
      this.flipLeft.classList.add("arrow-sleep");
      this.flipRight.classList.add("arrow-sleep");
      this.iconFlipLeft.classList.add("icon-flip-sleep");
      this.iconFlipRight.classList.add("icon-flip-sleep");
    }
  },
};

export default dom;
