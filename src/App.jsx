
import Calculator from "./components/Calculator";
import "./styles/calculator.css";

export default function App() {
  return (
    <div className="app-shell">
      <Calculator />

      <footer className="app-footer">
        <span>iPhone-inspired Calculator</span>
        <span>Built with React</span>
      </footer>
    </div>
  );
}
