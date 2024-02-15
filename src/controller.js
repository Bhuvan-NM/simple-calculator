'use strict';

const input = document.querySelector('.input');
const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result');
const clear = document.getElementById('clear');
const operation = document.querySelectorAll('.operators');
const equal = document.querySelector('.equal');
let resultDisplayed = false;
let ans = 0;

// Adding the event listener to the numbers
numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    let currStr = input.innerHTML;
    let lastChar = currStr[currStr.length - 1];

    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      lastChar === '+' ||
      lastChar === '-' ||
      lastChar === '×' ||
      lastChar === '÷'
    ) {
      resultDisplayed = false;
      input.innerHTML += e.target.textContent;
    } else {
      // if result is currently displayed and user pressed a number
      // we need clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = '';
      input.innerHTML += e.target.textContent;
    }
  });
});

operation.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    input.innerHTML += e.target.textContent;
  });
});

clear.addEventListener('click', function (e) {
  input.innerHTML = '';
});

equal.addEventListener('click', function (e) {
  let inputString = input.innerHTML;
  let numbers = inputString.split(/\+|\-|\×|\÷/g);
  let operators = inputString.replace(/[0-9]|\./g, '').split('');

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log('-------------------');

  //   while (divide !== -1) {
  //     const result = operationFN(
  //       '÷',
  //       Number(numbers[divide], numbers[divide + 1])
  //     );
  //     divide = operators.indexOf('÷');
  //   }
  var divide = operators.indexOf('÷');
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf('÷');
  }

  var multiply = operators.indexOf('×');
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf('×');
  }

  var subtract = operators.indexOf('-');
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf('-');
  }

  var add = operators.indexOf('+');
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf('+');
  }

  input.innerHTML = numbers[0]; // displaying the output

  resultDisplayed = true; // turning flag if result is displayed
});
