const inputSide1 = document.getElementById("side1");
const inputSide2 = document.getElementById("side2");
const inputSide3 = document.getElementById("side3");
const submitButton = document.getElementById("submit-button");
const outputField = document.getElementById("output");
let errorcase = 0;

const LOWER_LIMIT = 1;
const UPPER_LIMIT = 1000000000000; //XXX: change upper limit according to requirement

submitButton.addEventListener("click", () =>
  calculateInput(inputSide1.value, inputSide2.value, inputSide3.value)
);

// Validation Module
const validateInput = (side1, side2, side3) => {
  console.log(side1, side2, side3);
  // XXX: since input are of type number, string inputs will be result in <empty string> on variables
  if (isNaN(side1) || isNaN(side2) || isNaN(side3)) {
    //console.log("no data");
    if (isNaN(side1)) {
      inputSide1.style = "background-color : red";
    } else {
      inputSide1.style = "background-color : #cdda07";
    }
    if (isNaN(side2)) {
      inputSide2.style = "background-color : red";
    } else {
      inputSide2.style = "background-color : #cdda07";
    }
    if (isNaN(side3)) {
      inputSide3.style = "background-color : red";
    } else {
      inputSide3.style = "background-color : #cdda07";
    }
    errorcase = 1;
    return false;
  }
  if (
    !Number.isInteger(side1) ||
    !Number.isInteger(side2) ||
    !Number.isInteger(side3)
  ) {
    if (!Number.isInteger(side1)) {
      inputSide1.style = "background-color : red";
    } else {
      inputSide1.style = "background-color : #cdda07";
    }
    if (!Number.isInteger(side2)) {
      inputSide2.style = "background-color : red";
    } else {
      inputSide2.style = "background-color : #cdda07";
    }
    if (!Number.isInteger(side3)) {
      inputSide3.style = "background-color : red";
    } else {
      inputSide3.style = "background-color : #cdda07";
    }
    errorcase = 1;
    return false;
  }

  //due to rounding issue, value slightly lower than 1 might pass this condition
  if (side1 < LOWER_LIMIT || side2 < LOWER_LIMIT || side3 < LOWER_LIMIT) {
    if (side1 < LOWER_LIMIT) {
      inputSide1.style = "background-color : red";
    } else {
      inputSide1.style = "background-color : #cdda07";
    }
    if (side2 < LOWER_LIMIT) {
      inputSide2.style = "background-color : red";
    } else {
      inputSide2.style = "background-color : #cdda07";
    }
    if (side3 < LOWER_LIMIT) {
      inputSide3.style = "background-color : red";
    } else {
      inputSide3.style = "background-color : #cdda07";
    }
    errorcase = 2;
    return false;
  }
  //due to rounding issue, value slightly more than 1000000 might pass this condition
  if (side1 > UPPER_LIMIT || side2 > UPPER_LIMIT || side3 > UPPER_LIMIT) {
    if (side1 > UPPER_LIMIT) {
      inputSide1.style = "background-color : red";
    } else {
      inputSide1.style = "background-color : #cdda07";
    }
    if (side2 > UPPER_LIMIT) {
      inputSide2.style = "background-color : red";
    } else {
      inputSide2.style = "background-color : #cdda07";
    }
    if (side3 > UPPER_LIMIT) {
      inputSide3.style = "background-color : red";
    } else {
      inputSide3.style = "background-color : #cdda07";
    }
    errorcase = 2;
    return false;
  }
  if (
    side1 + side2 <= side3 ||
    side1 + side3 <= side2 ||
    side2 + side3 <= side1
  ) {
    errorcase = 3;
    return false;
  }
  return true;
};

// Calculate Module
// check
const calculateInput = (side1, side2, side3) => {
  const sideValues = [
    Number.parseFloat(side1),
    Number.parseFloat(side2),
    Number.parseFloat(side3),
  ];

  let output = "";

  if (validateInput(sideValues[0], sideValues[1], sideValues[2])) {
    inputSide1.style = "background-color : #cdda07";
    inputSide2.style = "background-color : #cdda07";
    inputSide3.style = "background-color : #cdda07";
    sideValues.sort();
    let isEquilateral = sideValues[0] == sideValues[2] ? true : false; //check
    let isIsosceles =
      sideValues[0] == sideValues[1] && sideValues[1] != sideValues[2]
        ? true
        : false; //check
    let isRight =
      sideValues[0] * sideValues[0] + sideValues[1] * sideValues[1] ==
      sideValues[2] * sideValues[2]
        ? true
        : false; //check

    if (isEquilateral) {
      output += "Equilateral Triangle";
    } else if (isIsosceles) {
      output += "Isosceles Triangle";
    } else {
      output += "Scalene Triangle";
    }

    if (isRight) {
      output += ", Right Triangle";
    }

    //XXX: Remove other angle checking (not in requirement)
  } else {
    if (errorcase == 1) {
      output += "Error, you have to put a value for every side.";
    } else if (errorcase == 2) {
      output += `Error, value must be in range ${LOWER_LIMIT}-${UPPER_LIMIT}.`;
    } else if (errorcase == 3) {
      output += "Error, can't create triangle from the input.";
    }
  }
  outputField.value = output;
};
