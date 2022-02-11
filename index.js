const inputSide1 = document.getElementById("side1");
const inputSide2 = document.getElementById("side2");
const inputSide3 = document.getElementById("side3");
const submitButton = document.getElementById("submit-button");
const outputField = document.getElementById("output");

submitButton.addEventListener("click", () =>
  calculateInput(inputSide1.value, inputSide2.value, inputSide3.value)
);

// Validation Module
// TODO: Apply error to corresponding input field (replace all console.log())
const validateInput = (side1, side2, side3) => {
  const LOWER_LIMIT = 1;
  const UPPER_LIMIT = 1000000;
  console.log(side1, side2, side3);
  // NOTE: since input are of type number, string inputs will be result in <empty string> on variables
  if (side1 === "" || side2 === "" || side3 === "") {
    console.log("no data");
    return false;
  }
  if (
    !Number.isInteger(side1) ||
    !Number.isInteger(side2) ||
    !Number.isInteger(side3)
  ) {
    console.log("not int");
    return false;
  }

  // FIXME: due to rounding issue, value slightly lower than 1 might pass this condition
  if (side1 < LOWER_LIMIT || side2 < LOWER_LIMIT || side3 < LOWER_LIMIT) {
    console.log("too low");
    return false;
  }
  // FIXME: due to rounding issue, value slightly more than 1000000 might pass this condition
  if (side1 > UPPER_LIMIT || side2 > UPPER_LIMIT || side3 > UPPER_LIMIT) {
    console.log("too high");
    return false;
  }
  if (
    side1 + side2 <= side3 ||
    side1 + side3 <= side2 ||
    side2 + side3 <= side1
  ) {
    console.log("not valid triangle");
    return false;
  }
  return true;
};

// Calculate Module
// TODO: Calculate triangle type + show error (replace all console.log())
const calculateInput = (side1, side2, side3) => {
  const sideValues = [
    Number.parseFloat(side1),
    Number.parseFloat(side2),
    Number.parseFloat(side3),
  ];

  let output = "";

  if (validateInput(sideValues[0], sideValues[1], sideValues[2])) {
    const longestSide = Math.max(sideValues);
    const longestSideIndex = sideValues.indexOf(longestSide);
    let isRight = true; //TODO: Check for right triangle with Pythagorean Theorem
    let isEquilateral = true; //TODO: Check condition
    let isIsosceles = true; //TODO: Check condition
    let isObtuse = true; //TODO: Check condition (The design has this type)
    let isRight = true; //TODO: Check condition

    if (isEquilateral) {
      output += "Equilateral Triangle";
    } else if (isIsosceles) {
      output += "Isosceles Triangle";
    } else {
      output += "Scalene Triangle";
    }
    if (isRight) {
      output += "Right Triangle";
    } else if (isObtuse) {
      output += "Obtuse Triangle";
    } else {
      output += "Acute Triangle";
    }
  } else {
    output += "some error";
  }

  return output;
};
