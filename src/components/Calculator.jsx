
import Display from "./Display";
import Keypad from "./Keypad";
import useCalculator from "../hooks/useCalculator";

export default function Calculator() {
  const {
    display,
    operator,
    handleButton,
  } = useCalculator();

  return (
    <main className="calculator">
      <div className="calculator-island" aria-hidden="true" />

      <Display value={display} operator={operator} />

      <Keypad
        onButtonClick={handleButton}
        activeOperator={operator}
      />
    </main>
  );
}
