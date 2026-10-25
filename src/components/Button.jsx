
export default function Button({
  label,
  type = "number",
  onClick,
  active = false,
}) {
  return (
    <button
      type="button"
      className={`calc-button calc-button--${type}${
        active ? " is-active" : ""
      }`}
      onClick={() => onClick(label)}
      aria-label={
        label === "⌫" ? "Backspace" :
        label === "±" ? "Toggle sign" :
        label
      }
    >
      {label}
    </button>
  );
}
