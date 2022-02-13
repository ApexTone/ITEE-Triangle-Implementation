const inputSide1 = document.getElementById("side1");
const inputSide2 = document.getElementById("side2");
const inputSide3 = document.getElementById("side3");
const submitButton = document.getElementById("submit-button");
const outputField = document.getElementById("output");
let errorcase = 0;

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
    //console.log("no data");
    errorcase = 1;
    return false;
  }
  if (
    !Number.isInteger(side1) ||
    !Number.isInteger(side2) ||
    !Number.isInteger(side3)
  ) {
    //console.log("not int");
    
    if(!Number.isInteger(side1)){inputSide1.style = "background-color : red"}
    else{inputSide1.style = "background-color : #cdda07"}
    if(!Number.isInteger(side2)){inputSide2.style = "background-color : red"}
    else{inputSide2.style = "background-color : #cdda07"}
    if(!Number.isInteger(side3)){inputSide3.style = "background-color : red"}
    else{inputSide3.style = "background-color : #cdda07"}
    errorcase = 1;
    return false;
  }

  //due to rounding issue, value slightly lower than 1 might pass this condition
  if (side1 < LOWER_LIMIT || side2 < LOWER_LIMIT || side3 < LOWER_LIMIT) {
    //console.log("too low");
    if(side1 < LOWER_LIMIT){inputSide1.style = "background-color : red"}
    else{inputSide1.style = "background-color : #cdda07"}
    if(side2 < LOWER_LIMIT){inputSide2.style = "background-color : red"}
    else{inputSide2.style = "background-color : #cdda07"}
    if(side3 < LOWER_LIMIT){inputSide3.style = "background-color : red"}
    else{inputSide3.style = "background-color : #cdda07"}
    errorcase = 2;
    return false;
  }
  //due to rounding issue, value slightly more than 1000000 might pass this condition
  if (side1 > UPPER_LIMIT || side2 > UPPER_LIMIT || side3 > UPPER_LIMIT) {
    //console.log("too high");
    if(side1 > UPPER_LIMIT){inputSide1.style = "background-color : red"}
    else{inputSide1.style = "background-color : #cdda07"}
    if(side2 > UPPER_LIMIT){inputSide2.style = "background-color : red"}
    else{inputSide2.style = "background-color : #cdda07"}
    if(side3 > UPPER_LIMIT){inputSide3.style = "background-color : red"}
    else{inputSide3.style = "background-color : #cdda07"}
    errorcase = 2;
    return false;
  }
  if (
    side1 + side2 <= side3 ||
    side1 + side3 <= side2 ||
    side2 + side3 <= side1
  ) {
    //console.log("not valid triangle");
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
    inputSide1.style = "background-color : #cdda07"
    inputSide2.style = "background-color : #cdda07"
    inputSide3.style = "background-color : #cdda07"
    const longestSide = Math.max(sideValues);
    const longestSideIndex = sideValues.indexOf(longestSide);
    sideValues.sort();
    console.log(sideValues);
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
    let isObique =
      sideValues[0] * sideValues[0] + sideValues[1] * sideValues[1] <
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
    } else if (isObique) {
      output += ", Obique Triangle";
    } else {
      output += ", Acute Triangle";
    }
  } 
  else {
    if (errorcase == 1) {
      output += "Error, you have to put a value every side.";
    }
    else if(errorcase == 2){
      output += "Error, value must be in range 1-1,000,000.";
    }
    else if(errorcase == 3){
      output +=  "Error, can't create triangle.";
    }
    
  }
  outputField.value= output;
  //return output;
};
