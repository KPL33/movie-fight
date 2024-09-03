import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAppContext } from "../../../../context/useAppContext";
import { omdbSearch, omdbFetch } from "../../../../utils/api";
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
  const [searchResults, setSearchResults] = useState([]);
  const [movieName, setMovieName] = useState(null);
  const [rottenTomatoesScore, setRottenTomatoesScore] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);


  const debouncedSearch = useRef(
    debounce(async (value) => {
      try {
        if (value.trim() === "") {
          setSearchResults([]);
          return;
        }
        const results = await omdbSearch(value);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    }, 1000)
  ).current;

  const handleInputChange = (value) => {
    setInputValue(value);
    debouncedSearch(value);

    // Reset states when typing
    setSubmitClicked(false);
    setInputStates(inputId, {
      movieName: null,
      rottenTomatoesScore: null,
      posterUrl: null,
      value: "",
    });
    setIsMissingData(false);
    setErrorPresent(null);
  };

  const handleMovieSelect = async (movieTitle) => {
    try {
      const fetchedData = await omdbFetch(
        movieTitle,
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
        value: movieTitle,
      });

      // Set the selected movie and clear search results
      setSelectedMovie(movieTitle); // <-- Set the selected movie
      setSearchResults([]);
      setInputValue(movieTitle);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
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
        <div className="input-container">
          <input
            className="input"
            id={inputId}
            type="text"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            style={{
              display: "block",
            }}
          />
          {searchResults.length > 0 && (
            <ul className="movie-list">
              {searchResults.map((movie) => (
                <li
                  key={movie.imdbID}
                  className={selectedMovie === movie.Title ? "selected" : ""}
                  onClick={() => handleMovieSelect(movie.Title)}
                >
                  {movie.Title} ({movie.Year})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {(!isSubmitVisible || !errorPresent) &&
        submitClicked &&
        rottenTomatoesScore !== null && (
          <div className="results">
            <h3 className="movie-info">
              <span>{movieName}</span>
              <br />
              <p>Score: </p>
              <span>{rottenTomatoesScore}%</span>
              {rottenTomatoesScore >= 60 ? (
                <img src={good} alt="Good" className="score-image" />
              ) : (
                <img src={bad} alt="Bad" className="score-image" id="bad" />
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
