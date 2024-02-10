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

  useEffect(() => {
    // Check if the screen width is less than or equal to 780 pixels
    const isMobile = window.innerWidth <= 780;

    if (isMobile) {
      if (submitClicked && !errorPresent) {
        console.log("Scrolling up...");
        window.scrollTo({
          top: window.scrollY - 800,
          behavior: "smooth",
        });
      } else if (
        errorPresent === "choice-error" ||
        errorPresent === "dup-error"
      ) {
        console.log("Scrolling down...");
        window.scrollTo({
          top: document.body.scrollHeight - window.innerHeight,
          behavior: "smooth",
        });
      } else {
        console.log("No scroll.");
      }
    }
  }, [submitClicked, errorPresent]);


  return (
    <div>
      <button
        className="int-btn"
        id="submit"
        onClick={() => handleButtonClick("submit")}
        style={{ display: submitClicked || errorPresent ? "none" : "flex" }}
      >
        <img src={submit} alt="Submit button" />
      </button>

      <button
        className="int-btn"
        id="go-back"
        onClick={() => handleButtonClick("goBack")}
        style={{ display: submitClicked && !errorPresent ? "flex" : "none" }}
      >
        <img src={goback} alt="Go back button" />
      </button>
    </div>
  );
};

export default IntButtons;
