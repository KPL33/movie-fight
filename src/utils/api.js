const omdbApiKey = "bd8b9b41";
let movieData = {};

export const omdbFetch = async (title, setErrorPresent, setIsMissingData) => {
  try {
    const request = `https://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`;
    const response = await fetch(request);

    if (response.ok) {
      const data = await response.json();

      if (!data.Title || !data.Poster) {
        console.error(
          "API response is missing essential data for title:",
          title
        );
        setIsMissingData(true);
        setErrorPresent("choice-error");
        throw new Error("API response is missing essential data");
      }

      setIsMissingData(false);
      setErrorPresent(null);

      const movieName = data.Title || null;
      const posterUrl = data.Poster || null;
      const rtScore = data.Ratings.find(
        (rating) => rating.Source === "Rotten Tomatoes"
      );
      const rottenTomatoesScore = rtScore ? parseInt(rtScore.Value) : null;

      const movieData = {
        movieName,
        posterUrl,
        rottenTomatoesScore,
      };

      return movieData;
    } else {
      console.error("API request failed for title:", title);
      throw new Error("Failed to retrieve data from OMDB API");
    }
  } catch (error) {
    console.error("Error fetching data from OMDB API for title:", title, error);
    setIsMissingData(true);
    setErrorPresent("choice-error");
    throw error;
  }
};

export const getStoredMovieData = () => {
  return { ...movieData };
};

