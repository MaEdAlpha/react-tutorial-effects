import React from 'react';

//use context object to avoid prop chaining. 
// need to PROVIDE/CONSUME(hook-in/listen to)
//need to wrap components with context to allow the components to access the context. checkout App.js..
const AuthContext = React.createContext({
    isLoggedIn:false,
});

export default AuthContext;