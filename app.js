const form = document.getElementById("formDate");
console.log(form);
const inputDay = document.getElementById("day");
console.log(inputDay.validity);
const inputMonth = document.getElementById("month");
console.log(inputMonth.validity);
const inputYear = document.getElementById("year");
console.log(inputYear.validity);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
  checkMissingValue(inputDay);
  checkMissingValue(inputMonth);
  checkMissingValue(inputYear);

  checkValueRange(inputDay);
});

// Check if the input has a value or not
// @param: input = input element (day, month, year)
function checkMissingValue(input) {
  if (input.validity.valueMissing) {
    input.nextElementSibling.innerText = "This field is required";
    input.parentElement.classList.add("error");
  } else {
    input.parentElement.classList.remove("error");
    input.nextElementSibling.innerText = "";
  }
}
