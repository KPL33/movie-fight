import { createContext, useState } from "react";
import PropTypes from "prop-types";

import spotlight1 from "../assets/spotlight1.jpg";
import spotlight2 from "../assets/spotlight2.jpg";

// ... (other imports and code)

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [inputStates, setInputStates] = useState({
    inputOne: {
      value: "",
      movieName: null,
      posterUrl: spotlight1,
      rottenTomatoesScore: null,
    },
    inputTwo: {
      value: "",
      movieName: null,
      posterUrl: spotlight2,
      rottenTomatoesScore: null,
    },
  });

  const [submitClicked, setSubmitClicked] = useState(false);
  const [goBackClicked, setGoBackClicked] = useState(false);
  const [errorPresent, setErrorPresent] = useState(null);
  const [isSubmitVisible, setIsSubmitVisible] = useState(true);
  const [isMissingData, setIsMissingData] = useState(false); // New state

  const updateInputState = (inputId, newInputState) => {
    setInputStates((prevInputStates) => {
      const updatedStates = {
        ...prevInputStates,
        [inputId]: {
          ...prevInputStates[inputId],
          ...newInputState,
        },
      };

      return updatedStates;
    });
  };

  return (
    <AppContext.Provider
      value={{
        inputStates,
        setInputStates: updateInputState,
        submitClicked,
        setSubmitClicked,
        goBackClicked,
        setGoBackClicked,
        errorPresent,
        setErrorPresent,
        isSubmitVisible,
        setIsSubmitVisible,
        isMissingData,
        setIsMissingData,
        spotlights: {
          spotlight1,
          spotlight2,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider, AppContext };
