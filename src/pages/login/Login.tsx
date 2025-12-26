import Button from "../../components/Button/Index";
import "./Login.css";
import config from "../../app/config";

export default function Login() {
  const handleLogin = () => {
    console.log("Login button clicked");
    const authUrl = `https://github.com/login/oauth/authorize?response_type=token&client_id=${config.client_id}&redirect_uri=${config.callback_url}&scope=read`;
    window.location.replace(authUrl);
  };

  return (
    <div className="login-container">
      <Button text="Login" onClick={handleLogin} />
    </div>
  );
}
