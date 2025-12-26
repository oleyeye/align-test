import "./style.css";

interface HeaderProps {
  title: string;
  icon?: string;
}

export default function Header({ title, icon }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <img src={icon} alt="Logo" className="header-icon" />
      </div>
      <h1 className="header-title">{title}</h1>
    </header>
  );
}
