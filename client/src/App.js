import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreateDog from "./components/Form/CreateDog";

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={LandingPage} />
      <Route path="/home" render={Home} />
      <Route path="/details" render={Details} />
      <Route path="/create" render={CreateDog} />
    </div>
  );
}

export default App;
