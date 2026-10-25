
import Button from "./Button";

const buttons = [
  { label: "AC", type: "utility" },
  { label: "±", type: "utility" },
  { label: "%", type: "utility" },
  { label: "÷", type: "operator" },

  { label: "7", type: "number" },
  { label: "8", type: "number" },
  { label: "9", type: "number" },
  { label: "×", type: "operator" },

  { label: "4", type: "number" },
  { label: "5", type: "number" },
  { label: "6", type: "number" },
  { label: "−", type: "operator" },

  { label: "1", type: "number" },
  { label: "2", type: "number" },
  { label: "3", type: "number" },
  { label: "+", type: "operator" },

  { label: "⌫", type: "number" },
  { label: "0", type: "number" },
  { label: ".", type: "number" },
  { label: "=", type: "operator" },
];

export default function Keypad({
  onButtonClick,
  activeOperator,
}) {
  return (
    <div className="calculator-keypad">
      {buttons.map((button) => (
        <Button
          key={button.label}
          label={button.label}
          type={button.type}
          active={
            button.type === "operator" &&
            button.label === activeOperator
          }
          onClick={onButtonClick}
        />
      ))}
    </div>
  );
}
