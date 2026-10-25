
export function calculate(first, second, operator) {
  const a = Number(first);
  const b = Number(second);

  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "−":
      result = a - b;
      break;
    case "×":
      result = a * b;
      break;
    case "÷":
      if (b === 0) {
        return "Error";
      }
      result = a / b;
      break;
    default:
      return String(second);
  }

  if (!Number.isFinite(result)) {
    return "Error";
  }

  // Avoid common floating-point display errors.
  return String(Number(result.toPrecision(12)));
}

export function formatNumber(value) {
  if (value === "Error") return value;

  const number = Number(value);

  if (!Number.isFinite(number)) return value;

  return number.toLocaleString("en-US", {
    maximumFractionDigits: 10,
    useGrouping: true,
  });
}
