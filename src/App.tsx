import "./App.css";
import { BrowserRouter } from "react-router";
import AppRouter from "./router/AppRouter";
import store from "./app/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./app/authContext";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;
