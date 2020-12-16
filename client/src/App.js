import React, { useState, useEffect } from "react";
import Axios from "axios";
import Routing from "./components/Routing";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ConfigureStore } from "./redux/configureStore";
import { Provider } from "react-redux";
import userContext from "../src/context/userContext";

const store = ConfigureStore();

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkedLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkedLoggedIn();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <userContext.Provider value={{ userData, setUserData }}>
          <div className="App">
            <Routing />
          </div>
        </userContext.Provider>
      </BrowserRouter>
    </Provider>
  );
}
