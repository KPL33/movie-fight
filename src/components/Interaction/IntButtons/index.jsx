import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import submit from "../../../assets/submit.jpg";
import goback from "../../../assets/goback.jpg";

const IntButtons = () => {
  const {
    submitClicked,
    setSubmitClicked,
    setGoBackClicked,
    goBackClicked,
    errorPresent,
    setInputStates,
  } = useContext(AppContext);

  // ...

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Scroll to the top when the page is about to be unloaded (hard reload)
      window.scrollTo(0, 0);
    };

    // Attach the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    const scrollDelay = setTimeout(() => {
      // Scroll to the custom position if goBackClicked or (submitClicked and !errorPresent)
      if (
        (goBackClicked || (submitClicked && !errorPresent)) &&
        window.innerWidth <= 1100
      ) {
        if (!errorPresent) {
          const customScrollPosition = window.innerHeight * 0.75;
          window.scrollTo({
            top: customScrollPosition,
            behavior: "smooth",
          });
        } else {
          // Scroll to the top (0) when errorPresent is 'blank-error'
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    }, 100);

    // Scroll to the bottom when errorPresent is 'dup-error' or 'choice-error'
    // Scroll to the bottom when errorPresent is 'dup-error' or 'choice-error'
    if (errorPresent === "dup-error" || errorPresent === "choice-error") {
      console.log("Scrolling down...");
      const scrollAmount = window.innerHeight * 0.6;
      window.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }

    // Clear the timeout on component unmount
    return () => {
      clearTimeout(scrollDelay);
      // Remove the event listener on component unmount
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [goBackClicked, submitClicked, errorPresent]); // Watch for changes in goBackClicked, submitClicked, and errorPresent

  // ...

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
