// Poster.js
import PropTypes from "prop-types";

const Poster = ({ src }) => {
  return <img className="spotlight" src={src} alt={"Image of a spotlight"} />;
};

Poster.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Poster;
