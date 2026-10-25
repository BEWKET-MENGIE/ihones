
import { useState } from "react";
import { calculate } from "../utils/calculatorLogic";

export default function useCalculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastOperator, setLastOperator] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);

  function clear() {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setLastOperator(null);
    setLastOperand(null);
  }

  function inputDigit(digit) {
    if (display === "Error") clear();

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) =>
      current === "0" ? digit : current + digit
    );
  }

  function inputDecimal() {
    if (display === "Error") clear();

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((current) => current + ".");
    }
  }

  function chooseOperator(nextOperator) {
    if (display === "Error") return;

    const currentValue = Number(display);

    if (operator && !waitingForOperand) {
      const result = calculate(
        previousValue,
        currentValue,
        operator
      );

      setDisplay(result);

      if (result === "Error") {
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }

      setPreviousValue(Number(result));
    } else {
      setPreviousValue(currentValue);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
    setLastOperator(null);
    setLastOperand(null);
  }

  function equals() {
    if (display === "Error") return;

    let activeOperator = operator;
    let first = previousValue;
    let second = Number(display);

    // Repeated equals: 2 + 3 = 5, then = gives 8.
    if (!activeOperator && lastOperator) {
      activeOperator = lastOperator;
      first = Number(display);
      second = lastOperand;
    }

    if (activeOperator === null || first === null) return;

    const result = calculate(first, second, activeOperator);

    setDisplay(result);
    setOperator(null);
    setPreviousValue(null);
    setWaitingForOperand(true);
    setLastOperator(activeOperator);
    setLastOperand(second);
  }

  function toggleSign() {
    if (display === "Error" || Number(display) === 0) return;

    setDisplay((current) =>
      current.startsWith("-") ? current.slice(1) : `-${current}`
    );
  }

  function percentage() {
    if (display === "Error") return;

    setDisplay(String(Number(display) / 100));
    setWaitingForOperand(false);
    setLastOperator(null);
    setLastOperand(null);
  }

  function backspace() {
    if (display === "Error" || waitingForOperand) return;

    setDisplay((current) => {
      const next = current.slice(0, -1);
      return next === "" || next === "-" ? "0" : next;
    });
  }

  function handleButton(value) {
    if (/^\d$/.test(value)) return inputDigit(value);

    switch (value) {
      case ".":
        inputDecimal();
        break;
      case "+":
      case "−":
      case "×":
      case "÷":
        chooseOperator(value);
        break;
      case "=":
        equals();
        break;
      case "AC":
        clear();
        break;
      case "±":
        toggleSign();
        break;
      case "%":
        percentage();
        break;
      case "⌫":
        backspace();
        break;
      default:
        break;
    }
  }

  return {
    display,
    operator,
    handleButton,
    clear,
    backspace,
  };
}
