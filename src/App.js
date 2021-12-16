import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const localStoargeLogInState = localStorage.getItem("isLoggedIn");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStoargeLogInState === "LOGGED_IN") setIsLoggedIn(true);
    //Have to useEffect, the code above creates an infinite re-rendering.
  }, [localStoargeLogInState]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "LOGGED_IN");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
      }}>
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
  );
}

export default App;
