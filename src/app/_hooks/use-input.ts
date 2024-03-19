import { useState } from "react";
import { ChangeEvent } from "react";

import classes from "../components/auth/SignupForm.module.css";

const useInput = (validationFun: (input: string) => Boolean) => {
  const [input, setInput] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const inputIsValid = validationFun(input);
  const inputHasError = !inputIsValid && inputTouched;

  const inputChangeHandler = (events: ChangeEvent<HTMLInputElement>) => {
    setInput(events.target.value);
  };

  const inputBlurHandler = (events: ChangeEvent<HTMLInputElement>) => {
    setInputTouched(true);
  };

  const inputClasses = inputHasError ? classes.invalid : "";

  return {
    input,
    setInput,
    inputTouched,
    setInputTouched,
    inputIsValid,
    inputHasError,
    inputClasses,
    inputChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
