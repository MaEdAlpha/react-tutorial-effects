import React, {useState, useEffect} from 'react';

//use context object to avoid prop chaining. 
// need to PROVIDE/CONSUME(hook-in/listen to).
//need to wrap components with context to allow the components to access the context. checkout App.js..
const AuthContext = React.createContext({
    isLoggedIn:false,
    onLogout: ()=>{},
    onLogin: (email,password) => {},
});

//create a provider component
export const AuthContextProdiver = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const localStoargeLogInState = localStorage.getItem("isLoggedIn");

    useEffect(() => {
        if (localStoargeLogInState === "LOGGED_IN") setIsLoggedIn(true);
        //Have to useEffect, the code above creates an infinite re-rendering.
      }, [localStoargeLogInState]);
    

    const logoutHandler = () =>{
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "LOGGED_IN");
        setIsLoggedIn(true);
    };
    return <AuthContext.Provider value={ { isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler } }>{props.children}</AuthContext.Provider>;
};

export default AuthContext;