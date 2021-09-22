const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");
const cashGivenDiv = document.querySelector("#cash-given-div");
const nextBtn = document.querySelector("#next-btn");
const checkBtn = document.querySelector("#check-btn");
const errorMsg = document.querySelector("#error-msg");
const noOfNotes = document.querySelectorAll(".no-of-notes");
const denominationTable = document.querySelector(".denominations");

const notesArray = [2000, 500, 100, 20, 10, 5, 1];

nextBtn.addEventListener("click", () => {
  hideError();
  const billAmountValue = Number(billAmount.value);
  if (billAmountValue > 0) {
    nextBtn.style.display = "none";
    cashGivenDiv.style.display = "flex";
  } else {
    showError("Invalid bill amount");
  }
});

checkBtn.addEventListener("click", () => {
  hideError();
  resetDenominationTable();
  const billAmountValue = Number(billAmount.value);
  const cashGivenValue = Number(cashGiven.value);
  if (cashGivenValue) {
    if (cashGivenValue > billAmountValue) {
      const amountToReturn = cashGivenValue - billAmountValue;
      calculateChange(amountToReturn);
      denominationTable.style.display = "block";
    } else if (cashGivenValue < billAmountValue) {
      showError("Cash is low. You'll have to do the dishes now.");
    } else {
      showError("No change to return");
    }
  } else {
    showError("Please enter cash");
  }
});

function calculateChange(amountToReturn) {
  for (let i = 0; i < notesArray.length; i++) {
    const numberOfNotes = Math.trunc(amountToReturn / notesArray[i]);
    amountToReturn %= notesArray[i];
    noOfNotes[i].innerText = numberOfNotes || "";
  }
}

function resetDenominationTable() {
  for (let notes of noOfNotes) {
    notes.innerText = "";
  }
}

function showError(msg) {
  errorMsg.style.display = "block";
  denominationTable.style.display = "none";
  errorMsg.innerText = msg;
}
function hideError() {
  errorMsg.style.display = "none";
}
