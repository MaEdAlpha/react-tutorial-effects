import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import AuthInput from "../UI/Input/AuthInput";

//define your reducerFn() outside of scope as it takes in no props.
//use dispatchFn(dispatchObj: {type:string, action:string | boolean | number}) in onChange events to update based off of difference scenarios.
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: null };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT_PW") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const authCtx = useContext(AuthContext);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const [formIsValid, setFormIsValid] = useState(
    emailState.isValid && passwordState.isValid
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log("CleanUp");
      clearTimeout(debounce);
    };
  }, [emailState.isValid, passwordState.isValid]);
  //It is good practice to pass the specific property into the useEffect dependency[ ], otherwise you will make unecessary calls (i.e using emailState instead of emailState.isValid)

  /*
  const  { isValid: emailIsValid } = emailState;  // pulling out isValid from emailState (and doing 'alias assignment' syntax for destructuring) creating emailIsValid as an 'alias'

  */
  //This tells React to run only if any of the dependencies have changed.

  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({ type: "USER_INPUT_PW", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    if(formIsValid){
      event.preventDefault();
      authCtx.onLogin(emailState.value, passwordState.value);
    }else if (!emailState.isValid){

    }else {
      
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <AuthInput
          id="email"
          type="email"
          label="E-mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <AuthInput
          id="password"
          type="password"
          label="Password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
