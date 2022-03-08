import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import noImage from "../img/download.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { catchPokemon, releasePokemon } from "../actions";
//import "../App.css";
import Error from "./Error";

const useStyles = makeStyles({
	card: {
		maxWidth: 250,
		height: "auto",
		marginLeft: "auto",
		marginRight: "auto",
		borderRadius: 5,
		border: "1px solid #1e8678",
		boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
	},
	titleHead: {
		borderBottom: "1px solid #1e8678",
		fontWeight: "bold",
	},
	grid: {
		flexGrow: 1,
		flexDirection: "row",
	},
	media: {
		height: "100%",
		width: "100%",
	},
	button: {
		color: "#1e8678",
		fontWeight: "bold",
		fontSize: 12,
	},
});

function PokemonListing(props) {
	const dispatch = useDispatch();
	const allState = useSelector((state) => state.trainers);
	let trainerId;

	allState.forEach((x) => {
		if (x.isSelected) {
			trainerId = x.id;
		}
	});
	const selectedTrainer = allState[allState.findIndex((x) => x.isSelected)];
	const seletteam = selectedTrainer.team;
	let teamlen = seletteam.length;

	const classes = useStyles();
	let test = isNaN(props.match.params.pagenum)
		? 0
		: Number(props.match.params.pagenum);

	const [page, setPage] = useState(Number(test));
	const [lspg, setLspg] = useState(false);
	const [loading, setLoading] = useState(true);
	const [pokelist, setPokeList] = useState();

	useEffect(() => {
		async function fetchData() {
			try {
				const {
					data: { results, next },
				} = await axios.get(`http://localhost:3000/pokemon/page/${page}`);

				setPokeList(results);
				setLspg(next);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [page]);

	const incr = () => {
		setPage(page + 1);
	};
	const decr = () => {
		setPage(page - 1);
	};

	const buildCard = (pokemon) => {
		let pokeId = pokemon.url.split("/")[6];
		let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.name}>
				<Card className={classes.card} variant="outlined">
					<Link to={`/pokemon/${pokemon.url.split("/")[6]}`}>
						<CardContent>
							<Typography
								className={classes.titleHead}
								gutterBottom
								variant="h6"
								component="h1"
							>
								{pokemon.name}
							</Typography>
						</CardContent>
						<CardMedia
							className={classes.media}
							component="img"
							image={image}
							title="show image"
						/>
					</Link>

					{seletteam.findIndex((x) => x.id == pokeId) != -1 ? (
						<button
							onClick={() => {
								dispatch(releasePokemon(trainerId, pokeId));
							}}
						>
							Release
						</button>
					) : teamlen != 6 &&
					  seletteam.findIndex((x) => x.id == pokeId) == -1 ? (
						<button
							onClick={() => {
								dispatch(
									catchPokemon(trainerId, {
										id: pokeId,
										name: pokemon.name,
										url: image,
									})
								);
							}}
						>
							Catch
						</button>
					) : (
						<button> Party Full </button>
					)}
				</Card>
			</Grid>
		);
	};
	if (test < 0) {
		return <h1> Bad page num</h1>;
	}
	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<div>
				<h1> POKEMON GOTTA CATCH EM ALL... </h1>
				<br />
				<Link className="showlink" to="/trainers">
					Add Trainers
				</Link>
				<div>
					<br />
					{page === 0 ? (
						""
					) : (
						<Link
							//className="paginationLink"
							to={`/pokemon/page/${page - 1}`}
							onClick={decr}
						>
							PREV...
							<br />
						</Link>
					)}
					<br />
					{lspg === null ? (
						""
					) : (
						<Link
							// className="paginationLink"
							to={`/pokemon/page/${page + 1}`}
							onClick={incr}
						>
							NEXT...
						</Link>
					)}
					<br />
				</div>
				<Grid container className={classes.grid} spacing={5}>
					{pokelist &&
						pokelist.map((poke) => {
							return buildCard(poke);
						})}
				</Grid>
			</div>
		);
	}
}

export default PokemonListing;
