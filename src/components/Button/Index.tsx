import "./style.css";

interface ButtonProps {
  text?: string;
}

export default function Button({ text = "" }: ButtonProps) {
  return (
    <button className="button" contentEditable={false}>
      {text}
    </button>
  );
}
