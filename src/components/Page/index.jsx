import "./styles.css";
import Compare from "./Compare";
// import Trailer from "./Trailer";

const Page = () => {
  return (
    <main>
      <h1 id="message">
        Choose your entertainment combatants and we&apos;ll compare their Rotten
        Tomatoes scores head-to-head!
      </h1>
      <Compare />
      {/* <Trailer /> */}
    </main>
  );
};

export default Page;
