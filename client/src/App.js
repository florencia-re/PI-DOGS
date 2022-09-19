import "./App.css";
import { Route } from "react-router-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreateDog from "./components/Form/CreateDog";
import Error404 from "./components/Error/Error404"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={CreateDog} />
        <Route exact path="/details/:id" component={Details} />
        <Route path="*" component={Error404} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
