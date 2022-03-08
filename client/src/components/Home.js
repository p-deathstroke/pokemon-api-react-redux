import React from "react";
import { Link } from "react-router-dom";
import bg from "../img/sqirtlesquad.gif";
function Home() {
	return (
		<div>
			<br />
			<br />
			<br />
			{<img src={bg} alt="logo" />}
			<h1> This is a application for cathching pokemon</h1>
			<Link className="showlink" to="/pokemon/page/0">
				Pokemon Listing
			</Link>{" "}
			<br />
			<br />
			<Link className="showlink" to="/trainers">
				Trainers
			</Link>
		</div>
	);
}

export default Home;
