import "./style.css";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
}

export default function Button({ text = "", onClick = () => {} }: ButtonProps) {
  return (
    <button className="button" onClick={onClick} contentEditable={false}>
      {text}
    </button>
  );
}
