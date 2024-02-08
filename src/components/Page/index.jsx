import "./styles.css";
import Compare from "./Compare";
// import Trailer from "./Trailer";

const Page = () => {
  return (
    <main>
      <h1 id="message">
        Choose your entertainment combatants and <br />
        <span className="inst">click the TICKET below! </span>
        <br />
        We&apos;ll compare Rotten Tomatoes scores for your choices,
        head-to-head!
      </h1>
      <Compare />
      {/* <Trailer /> */}
    </main>
  );
};

export default Page;
