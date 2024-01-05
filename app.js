const form = document.getElementById("formDate");
const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
let spanDays = document.getElementById("result__days");
let spanMonths = document.getElementById("result__months");
let spanYears = document.getElementById("result__years");
const YEARMS = 31556952000;
const MONTHMS = 2629746000;
const DAYMS = 86400000;
let error = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeErrorClass();
  cleanDifference();
  error = 0;
  checkMissingValue(inputDay, "a valid day");
  checkMissingValue(inputMonth, "a valid month");
  checkMissingValue(inputYear, "in the past");
  dateValidity();
  if (error == 0) {
    dateUser(inputDay.value, inputMonth.value, inputYear.value);
  }
});

function cleanDifference() {
  spanDays.innerText = "--";
  spanMonths.innerText = "--";
  spanYears.innerText = "--";
}

function removeErrorClass() {
  inputDay.parentElement.classList.remove("error");
  inputMonth.parentElement.classList.remove("error");
  inputYear.parentElement.classList.remove("error");
}

function addErrorClass() {
  inputDay.parentElement.classList.add("error");
  inputMonth.parentElement.classList.add("error");
  inputYear.parentElement.classList.add("error");
}

// Check if the input has a value or not
// @param: input = input element (day, month, year)
function checkMissingValue(input, text) {
  if (input.validity.valueMissing) {
    input.nextElementSibling.innerText = "This field is required";
    error = 1;
  } else if (input.validity.rangeOverflow || input.validity.rangeUnderflow) {
    input.nextElementSibling.innerText = "Must be " + `${text}`;
    error = 1;
  } else {
    input.nextElementSibling.innerText = "";
  }

  errorClass(input);
}

// Change the class if the input is valid or not
// @param: input = input element (day, month, year)
function errorClass(input) {
  if (input.validity.valid) {
    input.parentElement.classList.remove("error");
  } else {
    input.parentElement.classList.add("error");
  }
}

// Create date with user input
// @day

function dateUser(day, month, year) {
  const date = new Date();
  date.setMonth(month - 1, day);
  date.setFullYear(year);
  compareDate(date);
}

function compareDate(dateUser) {
  const today = new Date();

  let dateDifference = today - dateUser;
  if (dateDifference < 0) {
    addErrorClass();
    inputYear.nextElementSibling.innerText = "Must be in the past";
  } else {
    renderDateDifference(dateDifference);
  }
}

function renderDateDifference(dateDifference) {
  let [dayDifference, monthDifference, yearDifference] = "";
  yearDifference = Math.floor(dateDifference / YEARMS);
  dateDifference = dateDifference - yearDifference * YEARMS;
  monthDifference = Math.floor(dateDifference / MONTHMS);
  dateDifference = dateDifference - monthDifference * MONTHMS;
  dayDifference = Math.floor(dateDifference / DAYMS);

  //   updateDate(yearDifference, spanYears);
  // updateDate(monthDifference, spanMonths);
  //   updateDate(dayDifference, spanDays);
  spanDays.innerText = dayDifference;
  spanMonths.innerText = monthDifference;
  spanYears.innerText = yearDifference;
}

function dateValidity() {
  let months = [4, 6, 9, 11];

  if (months.includes(parseInt(inputMonth.value))) {
    if (inputDay.value == 31) {
      error = 1;
    }
  } else if (inputMonth.value == 2) {
    let bisextile = inputYear.value / 4;
    if (bisextile != Math.floor(bisextile) && inputDay.value > 28) {
      error = 1;
    } else if (inputDay.value > 29) {
      error = 1;
    }
  }

  if (error == 1) {
    addErrorClass();
    inputDay.nextElementSibling.innerText = "Must be a valid date";
  }
}

// // Stores the setInterval ID used by
// // clearInterval to stop the timer
// var interval;

// let t = 0; // Timer

// // Function that changes the timer
// function changeTimer() {
//   // prendre un xème de la différence
//   if (t < 750) {
//     t = t * 1.15;
//   } else {
//     t = t;
//   }
// }

// // Function that run at irregular intervals
// function f1(indexTime, difference, span) {
//   // Clears the previous setInterval timer
//   clearInterval(interval);
//   console.log("timer " + t);
//   indexTime++;
//   console.log(indexTime);
//   span.innerText = indexTime;

//   changeTimer();
//   if (indexTime != difference) {
//     console.log("if");
//     interval = setInterval(f1, t, indexTime, difference, span);
//   }
// }

// // Function that run at irregular intervals
// function f1(indexTime, difference, span) {
//   // Clears the previous setInterval timer
//   clearInterval(interval);
//   console.log("timer " + t);
//   indexTime++;
//   console.log(indexTime);
//   span.innerText = indexTime;

//   changeTimer();
//   if (indexTime != difference) {
//     console.log("if");
//     interval = setInterval(f1, t, indexTime, difference, span);
//   }
// }

// async function updateDate(difference, span) {
//   let indexTime = 0;
//   t = 100;
//   console.log(difference);
//   //   f1(indexTime, difference, span);

//   const msg = await f1(indexTime, difference, span);
//   console.log("message +" + msg);
// }
