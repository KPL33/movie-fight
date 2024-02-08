import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import submit from "../../../assets/submit.jpg";
import goback from "../../../assets/goback.jpg";

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
        className="int-btn"
        id="submit"
        onClick={() => handleButtonClick("submit")}
        style={{ display: submitClicked || errorPresent ? "none" : "flex" }}
      >
        <img src={submit} />
      </button>

      <button
        className="int-btn"
        id="go-back"
        onClick={() => handleButtonClick("goBack")}
        style={{ display: submitClicked && !errorPresent ? "flex" : "none" }}
      >
        <img src={goback} />
      </button>
    </div>
  );
};

export default IntButtons;
