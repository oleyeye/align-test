import Header from "../components/Header/Index";
import Icon from "../assets/react.svg";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <Header icon={Icon} title="Align Test" />
      <main>
        <Outlet />
      </main>
    </>
  );
}
