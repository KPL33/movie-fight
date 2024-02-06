import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

const IntButtons = () => {
  const {
    submitClicked,
    setSubmitClicked,
    setGoBackClicked,
    errorPresent,
    setInputStates,
  } = useContext(AppContext);

  const handleButtonClick = (buttonType) => {
    if (buttonType === "submit") {
      setSubmitClicked(true);
      setGoBackClicked(false);
    } else if (buttonType === "goBack") {
      setGoBackClicked(true);
      setSubmitClicked(false);

      // Reset the state of isInputOneEmpty and isInputTwoEmpty to true
      setInputStates("inputOne", {
        value: "",
        isInputOneEmpty: true,
      });
      setInputStates("inputTwo", {
        value: "",
        isInputTwoEmpty: true,
      });
    }
  };

  return (
    <div>
      <button
        className="btn"
        id="submit"
        onClick={() => handleButtonClick("submit")}
        style={{ display: submitClicked || errorPresent ? "none" : "flex" }}
      >
        Fight for my attention!
      </button>

      <button
        className="btn"
        id="go-back"
        onClick={() => handleButtonClick("goBack")}
        style={{ display: submitClicked && !errorPresent ? "flex" : "none" }}
      >
        Click to compare new movies!
      </button>
    </div>
  );
};

export default IntButtons;
