const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");
const clockElement = document.getElementById("clock");

let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let expressionDisplay = "";

// Update Live Clock in Status Bar
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  clockElement.textContent = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// Adjust Font Size Dynamically for Equations/Numbers on Screen
function updateDisplay() {
  display.textContent = expressionDisplay || currentInput;
  const length = display.textContent.length;
  
  if (length > 12) {
    display.style.fontSize = "32px";
  } else if (length > 8) {
    display.style.fontSize = "44px";
  } else {
    display.style.fontSize = "60px";
  }
  
  // Toggle AC / C button text
  const clearButton = document.querySelector(".button.ac");
  if (clearButton) {
    clearButton.textContent = (currentInput !== "0" || firstOperand !== null || expressionDisplay !== "") ? "C" : "AC";
  }
}

// Clear active state styling from all operators
function clearOperatorHighlight() {
  document.querySelectorAll(".button.operator").forEach((btn) => {
    btn.classList.remove("active-operator");
  });
}

// Handle Digit Inputs
function inputDigit(digit) {
  if (waitingForSecondOperand === true) {
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === "0" ? digit : currentInput + digit;
  }
  
  // Build equation string: firstOperand + operator + currentInput
  if (operator !== null && firstOperand !== null) {
    expressionDisplay = `${firstOperand} ${operator} ${currentInput}`;
  } else {
    expressionDisplay = currentInput;
  }
  
  clearOperatorHighlight();
}

// Handle Decimal Point
function inputDecimal() {
  if (waitingForSecondOperand === true) {
    currentInput = "0.";
    waitingForSecondOperand = false;
    if (operator !== null && firstOperand !== null) {
      expressionDisplay = `${firstOperand} ${operator} ${currentInput}`;
    } else {
      expressionDisplay = currentInput;
    }
    clearOperatorHighlight();
    return;
  }
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  
  if (operator !== null && firstOperand !== null) {
    expressionDisplay = `${firstOperand} ${operator} ${currentInput}`;
  } else {
    expressionDisplay = currentInput;
  }
  clearOperatorHighlight();
}

// Handle Arithmetic Operators (+, -, ×, ÷)
function handleOperator(nextOperator, buttonElement) {
  const inputValue = parseFloat(currentInput);

  clearOperatorHighlight();
  if (buttonElement) {
    buttonElement.classList.add("active-operator");
  }

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    expressionDisplay = `${firstOperand} ${operator}`;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(firstOperand, inputValue, operator);
    currentInput = `${parseFloat(result.toFixed(8))}`;
    firstOperand = parseFloat(currentInput);
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
  expressionDisplay = `${firstOperand} ${operator}`;
}

// Perform Calculations
function operate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      if (b === 0) {
        alert("Error: Division by zero");
        resetCalculator();
        return 0;
      }
      return a / b;
    default:
      return b;
  }
}

// Reset Calculator State
function resetCalculator() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  expressionDisplay = "";
  clearOperatorHighlight();
}

// Toggle Positive / Negative Sign
function toggleSign() {
  if (currentInput !== "0") {
    currentInput = currentInput.startsWith("-") 
      ? currentInput.slice(1) 
      : "-" + currentInput;
    
    if (operator !== null && firstOperand !== null) {
      expressionDisplay = `${firstOperand} ${operator} ${currentInput}`;
    } else {
      expressionDisplay = currentInput;
    }
  }
}

// Calculate Percentage
function calculatePercentage() {
  const value = parseFloat(currentInput) / 100;
  currentInput = String(parseFloat(value.toFixed(8)));
  expressionDisplay = currentInput;
}

// Button Click Event Listeners
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    
    if (!action) return;

    if (!isNaN(action)) {
      inputDigit(action);
    } else {
      switch (action) {
        case "decimal":
          inputDecimal();
          break;
        case "clear":
          resetCalculator();
          break;
        case "sign":
          toggleSign();
          break;
        case "percent":
          calculatePercentage();
          break;
        case "add":
          handleOperator("+", button);
          break;
        case "subtract":
          handleOperator("−", button);
          break;
        case "multiply":
          handleOperator("×", button);
          break;
        case "divide":
          handleOperator("÷", button);
          break;
        case "calculate":
          clearOperatorHighlight();
          if (operator && firstOperand !== null) {
            const inputValue = parseFloat(currentInput);
            const result = operate(firstOperand, inputValue, operator);
            currentInput = `${parseFloat(result.toFixed(8))}`;
            expressionDisplay = currentInput;
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = true;
          }
          break;
      }
    }
    updateDisplay();
  });
});

// Initialize Display State
updateDisplay();