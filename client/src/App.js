import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import PokemonListing from "./components/PokemonListing";
import Pokemon from "./components/Pokemon";
import Trainers from "./components/Trainers";
import ErrorPage from "./components/Error";

function App() {
	return (
		<Router>
			<div className="App">
				<div className="App-body">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route
							exact
							path="/pokemon/page/:pagenum"
							component={PokemonListing}
						/>
						<Route exact path="/pokemon/:id" component={Pokemon} />
						<Route exact path="/trainers" component={Trainers} />
						<Route exact path="*" component={ErrorPage} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
