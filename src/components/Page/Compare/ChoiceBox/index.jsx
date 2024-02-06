// ChoiceBox.js
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAppContext } from "../../../../context/useAppContext";
import { omdbFetch } from "../../../../utils/api";
import Poster from "./Poster";
import good from "../../../../assets/good.svg";
import bad from "../../../../assets/bad.svg";
import debounce from "lodash/debounce";
import "./styles.css";

const ChoiceBox = ({ inputId, inputPlaceholder, posterSrc }) => {
  const {
    setInputStates,
    isSubmitVisible,
    setSubmitClicked,
    submitClicked,
    goBackClicked,
    errorPresent,
    setErrorPresent,
    setIsMissingData,
  } = useAppContext();

  const [inputValue, setInputValue] = useState("");
  const [movieName, setMovieName] = useState(null);
  const [rottenTomatoesScore, setRottenTomatoesScore] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);

  const debouncedFetch = useRef(
    debounce(async (value) => {
      try {
        if (value.trim() === "") {
          // You can handle this case as needed, for example, reset the Poster
          setPosterUrl(null);
          return;
        }
        const fetchedData = await omdbFetch(
          value,
          setErrorPresent,
          setIsMissingData
        );

        setMovieName(fetchedData.movieName);
        setRottenTomatoesScore(fetchedData.rottenTomatoesScore);
        setPosterUrl(fetchedData.posterUrl);

        setInputStates(inputId, {
          movieName: fetchedData.movieName,
          rottenTomatoesScore: fetchedData.rottenTomatoesScore,
          posterUrl: fetchedData.posterUrl,
          value: value, // Ensure you update the context with the input value
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 1000)
  ).current;

  const handleInputChange = (value) => {
    setInputValue(value);
    debouncedFetch(value);

    // Reset all error and submit button visibility
    setSubmitClicked(false);
    setInputStates(inputId, {
      movieName: null,
      rottenTomatoesScore: null,
      posterUrl: null,
      value: "", // Ensure you update the context with an empty value
    });

    // Clear all errors
    setIsMissingData(false);
    setErrorPresent(null);
  };

  const resetValues = () => {
    setInputValue("");
    setMovieName(null);
    setRottenTomatoesScore(null);
    setPosterUrl(null);
  };

  useEffect(() => {
    if (goBackClicked) {
      resetValues();
    }
  }, [goBackClicked]);

  return (
    <div className="choice-box">
      <Poster src={posterUrl || posterSrc} />
      {isSubmitVisible && (
        <input
          className="input"
          id={inputId}
          type="text"
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          style={{ display: submitClicked && !errorPresent ? "none" : "block" }}
        />
      )}

      {(!isSubmitVisible || !errorPresent) &&
        submitClicked &&
        rottenTomatoesScore !== null && (
          <div className="results">
            <h3 className="movie-info">
              <span>{movieName}</span>
              <br />
              <p>has a Rotten Tomatoes Score of: </p>
              <span>{rottenTomatoesScore}%</span>
              {rottenTomatoesScore >= 60 ? (
                <img src={good} alt="Good" className="score-image" />
              ) : (
                <img src={bad} alt="Bad" className="score-image" />
              )}
            </h3>
          </div>
        )}
    </div>
  );
};

ChoiceBox.propTypes = {
  inputId: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  posterSrc: PropTypes.string.isRequired,
};

export default ChoiceBox;
