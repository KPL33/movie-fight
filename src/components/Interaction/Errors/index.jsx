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
          Please be sure to enter 2 titles before trying your search.{" "}
          <i
            className="em em-upside_down_face"
            aria-label="UPSIDE-DOWN FACE"
          ></i>
        </h2>
      )}

      {errorPresent === "choice-error" && (
        <h2 id="choice-error">
          Data not found. Please try a new search.{" "}
          <i className="em em-thinking_face" aria-label="THINKING FACE"></i>
        </h2>
      )}

      {errorPresent === "dup-error" && (
        <h2 id="dup-error">
          Please enter different titles in both fields, or maybe just watch that
          movie, since it seems you REALLY want to.
          <i
            className="em em-stuck_out_tongue_winking_eye"
            aria-label="FACE WITH STUCK-OUT TONGUE AND WINKING EYE"
          ></i>
        </h2>
      )}
    </div>
  );
};

export default Errors;
