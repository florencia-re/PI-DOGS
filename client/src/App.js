import "./App.css";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreateDog from "./components/Form/CreateDog";
import About from "./components/NavBar/About";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" render={LandingPage} />
        <Route path="/home" render={Home} />
        <Route path="/details/:id" component={Details} />
        <Route path="/create" render={CreateDog} />
        <Route path="/about" render={About} />
      </div>
    </BrowserRouter>
  );
}

export default App;
