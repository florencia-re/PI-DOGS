import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home'

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Route exact path ='/' render={LandingPage} />
      <Route path ='/home' render={Home} />
    </div>
  );
}

export default App;
