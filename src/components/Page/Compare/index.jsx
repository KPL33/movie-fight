import "./styles.css";
import ChoiceBox from "./ChoiceBox";
import { useAppContext } from "../../../context/useAppContext";

const Compare = () => {
  const { spotlights } = useAppContext();

  return (
    <section id="compare">
      <ChoiceBox
        key="inputOne"
        inputId="inputOne"
        inputPlaceholder="First Choice"
        posterSrc={spotlights.spotlight1}
      />
      <ChoiceBox
        key="inputTwo"
        inputId="inputTwo"
        inputPlaceholder="Second Choice"
        posterSrc={spotlights.spotlight2}
      />
    </section>
  );
};

export default Compare;