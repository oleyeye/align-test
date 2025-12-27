import Button from "../../components/Button/Index";
import "./Login.css";
import config from "../../app/config";
import { useAuth } from "../../app/authContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Login() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    console.log("Login button clicked");
    const authUrl = `https://github.com/login/oauth/authorize?response_type=token&client_id=${config.client_id}&redirect_uri=${config.callback_url}&scope=read`;
    window.location.replace(authUrl);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products')
    }
  }, [isAuthenticated])

  return (
    <div className="login-container">
      <h3>
        orem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor
        sapien sit amet risus faucibus ornare. Vivamus semper sem augue, quis
        molestie orci porta ut.
      </h3>
      <Button text="Login" onClick={handleLogin} />
    </div>
  );
}
