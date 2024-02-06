import { useEffect, useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const Errors = () => {
  const {
    inputStates,
    errorPresent,
    setErrorPresent,
    submitClicked,
    isMissingData,
  } = useContext(AppContext);

  useEffect(() => {
    const isInputOneEmpty = inputStates.inputOne.value.trim() === "";
    const isInputTwoEmpty = inputStates.inputTwo.value.trim() === "";
    const isSameInput =
      !isInputOneEmpty &&
      !isInputTwoEmpty &&
      inputStates.inputOne.value.trim() === inputStates.inputTwo.value.trim();

    if (submitClicked && (isInputOneEmpty || isInputTwoEmpty)) {
      setErrorPresent("blank-error");
    } else if (isSameInput) {
      setErrorPresent("dup-error");
    } else if (isMissingData) {
      setErrorPresent("choice-error");
    } else {
      // Clear errors if none of the error conditions are met
      setErrorPresent(null);
    }
  }, [
    inputStates.inputOne.value,
    inputStates.inputTwo.value,
    submitClicked,
    setErrorPresent,
    isMissingData,
  ]);


  return (
    <div className="errors">
      {errorPresent === "blank-error" && (
        <h2 id="blank-error">
          Please be sure to enter 2 titles before trying your search.
        </h2>
      )}

      {errorPresent === "choice-error" && (
        <h2 id="choice-error">
          Data not found. Please try a new search.
        </h2>
      )}

      {errorPresent === "dup-error" && (
        <h2 id="dup-error">Please enter different titles in both fields.</h2>
      )}
    </div>
  );
};

export default Errors;
