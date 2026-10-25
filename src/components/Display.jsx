
import { formatNumber } from "../utils/calculatorLogic";

export default function Display({ value, operator }) {
  const formattedValue = formatNumber(value);

  return (
    <div className="calculator-display">
      <div className="display-status">
        <span>Calculator</span>
        <span>{operator ? `Operation: ${operator}` : " "}</span>
      </div>

      <div
        className="display-value"
        aria-live="polite"
        aria-atomic="true"
      >
        {formattedValue}
      </div>
    </div>
  );
}
