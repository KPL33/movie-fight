import './styles.css';
import email from "../../assets/email.svg";
import github from '../../assets/github.svg';
import linkedin from '../../assets/LI-In-Bug.svg';
import leetcode from '../../assets/leetcode_logo.svg';
import reactLogo from '../../assets/react.png';

const Footer = () => {
  const emailAddress="kevdev@myyahoo.com";

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  }
  return (
    <footer id="contact-section" className="box">
      <div id="email-container">
        <a
          id="email-link"
          href={`mailto:${emailAddress}`}
          onClick={handleEmailClick}
        >
          <img
            id="email"
            className="social-logo"
            src={email}
            alt="Email icon"
          />
          <p id="email-address">kevdev@myyahoo.com</p>
        </a>
      </div>
      <div className="socials">
        <a href="https://www.linkedin.com/in/kevin-lewis92126">
          <img
            id="linkedin"
            className="social-logo"
            src={linkedin}
            alt="LinkedIn logo"
          />
        </a>
        <a href="https://github.com/KPL33">
          <img
            id="github"
            className="social-logo"
            src={github}
            alt="GitHub logo"
          />
        </a>
        <a href="https://leetcode.com/KPL33/">
          <img
            id="leetcode"
            className="social-logo"
            src={leetcode}
            alt="LeetCode logo"
          />
        </a>
      </div>
      <div id="madewith">
        <p>
          This site made with &nbsp; <img id="react-logo" src={reactLogo} />
          &nbsp; by Kevin Lewis
        </p>
      </div>
    </footer>
  );
};
export default Footer;
