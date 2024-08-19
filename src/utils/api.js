const omdbApiKey = "bd8b9b41";
let movieData = {};

// Search for movies by title using 's'
export const omdbSearch = async (title) => {
  try {
    const request = `https://www.omdbapi.com/?s=${title}&apikey=${omdbApiKey}`;
    const response = await fetch(request);

    if (response.ok) {
      const data = await response.json();

      if (data.Response === "True") {
        return data.Search; // Returns an array of search results
      } else {
        console.error("No search results found for title:", title);
        throw new Error(data.Error || "No search results found");
      }
    } else {
      console.error("API request failed for search:", title);
      throw new Error("Failed to retrieve data from OMDB API");
    }
  } catch (error) {
    console.error("Error searching for movies:", error);
    return []; // Return an empty array if there is an error
  }
};

// Fetch movie details by title using 't'
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

      // Use this single declaration
      movieData = {
        movieName: data.Title || null,
        posterUrl: data.Poster || null,
        rottenTomatoesScore: data.Ratings.find(
          (rating) => rating.Source === "Rotten Tomatoes"
        )
          ? parseInt(
              data.Ratings.find((rating) => rating.Source === "Rotten Tomatoes")
                .Value
            )
          : null,
      };

      // Log the movie name and Rotten Tomatoes score
      console.log("Movie Name:", movieData.movieName);
      console.log("Rotten Tomatoes Score:", movieData.rottenTomatoesScore);

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
