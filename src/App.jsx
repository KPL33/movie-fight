import "./App.css";
import Header from "./components/Header";
import Page from "./components/Page";
import Interaction from "./components/Interaction";
import Footer from "./components/Footer";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <>
        <Header />
        <Page />
        <Interaction />
        <Footer />
      </>
    </AppProvider>
  );
};
export default App;
