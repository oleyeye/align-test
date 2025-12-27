import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../app/authContext";
import { saveToken } from "../../utils";

export default function Landing() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      saveToken(token);
      auth.login();
      navigate("/products");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Login...</div>;
}
