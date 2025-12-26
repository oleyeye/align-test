import { Link } from "react-router";
import "./style.css";

interface HeaderProps {
  title: string;
  icon?: string;
}

export default function Header({ title, icon }: HeaderProps) {
  return (
    <header className="header">
      <Link to="/">
        <img src={icon} alt="Logo" className="header-icon" />
      </Link>
      <h1 className="header-title">{title}</h1>
    </header>
  );
}
