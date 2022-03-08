import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	makeStyles,
} from "@material-ui/core";
import noImage from "../img/download.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { catchPokemon, releasePokemon } from "../actions";

const useStyles = makeStyles({
	card: {
		maxWidth: 500,
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
	inner_media: {
		height: "20%",
		width: "20%",
	},
	button: {
		color: "#1e8678",
		fontWeight: "bold",
		fontSize: 12,
	},
});

function Pokemon(props) {
	const dispatch = useDispatch();
	const allState = useSelector((state) => state.trainers);
	let trainerId;
	allState.forEach((x) => {
		if (x.isSelected) {
			return (trainerId = x.id);
		}
	});

	const selectedTrainer = allState[allState.findIndex((x) => x.isSelected)];
	const seletteam = selectedTrainer.team;
	let teamlen = seletteam.length;

	const classes = useStyles();
	let id = props.match.params.id;
	const [loading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState();

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await axios.get(`http://localhost:3000/pokemon/${id}`);

				setPokemon(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [id]);

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<div>
				<br />
				<Card className={classes.card} variant="outlined">
					<h1>{pokemon.name}</h1>
					<CardMedia
						className={classes.media}
						component="img"
						image={
							pokemon.sprites.other["official-artwork"].front_default &&
							pokemon.sprites.other["official-artwork"].front_default
								? pokemon.sprites.other["official-artwork"].front_default
								: noImage
						}
						title="show image"
					/>
					<div>
						{seletteam.findIndex((x) => x.id == pokemon.id) != -1 ? (
							<button
								onClick={() => {
									dispatch(releasePokemon(trainerId, pokemon.id));
								}}
							>
								Release
							</button>
						) : teamlen != 6 &&
						  seletteam.findIndex((x) => x.id == pokemon.id) == -1 ? (
							<button
								onClick={() => {
									dispatch(
										catchPokemon(trainerId, {
											id: pokemon.id,
											name: pokemon.name,
											url: pokemon.url,
										})
									);
								}}
							>
								Catch
							</button>
						) : (
							<button> Party Full </button>
						)}
					</div>
					<CardMedia
						className={classes.inner_media}
						component="img"
						image={
							pokemon.sprites.versions["generation-i"].yellow.front_default &&
							pokemon.sprites.versions["generation-i"].yellow.front_default
								? pokemon.sprites.versions["generation-i"].yellow.front_default
								: noImage
						}
						title="show image"
					/>
					<CardMedia
						className={classes.inner_media}
						component="img"
						image={
							pokemon.sprites.versions["generation-ii"].gold.front_default &&
							pokemon.sprites.versions["generation-ii"].gold.front_default
								? pokemon.sprites.versions["generation-ii"].gold.front_default
								: noImage
						}
						title="show image"
					/>
					<CardMedia
						className={classes.inner_media}
						component="img"
						image={
							pokemon.sprites.versions["generation-iii"].emerald
								.front_default &&
							pokemon.sprites.versions["generation-iii"].emerald.front_default
								? pokemon.sprites.versions["generation-iii"].emerald
										.front_default
								: noImage
						}
						title="show image"
					/>
					<CardMedia
						className={classes.inner_media}
						component="img"
						image={
							pokemon.sprites.versions["generation-iv"].platinum
								.front_default &&
							pokemon.sprites.versions["generation-iv"].platinum.front_default
								? pokemon.sprites.versions["generation-iv"].platinum
										.front_default
								: noImage
						}
						title="show image"
					/>

					<CardContent>
						<h2> ABILITIES</h2>
						{pokemon.abilities &&
							pokemon.abilities.map((x) => {
								return <Typography>{x.ability.name}</Typography>;
							})}
						<h2> TYPE</h2>
						{pokemon.types &&
							pokemon.types.map((x) => {
								return <Typography>{x.type.name}</Typography>;
							})}
						<h2> MOVES</h2>
						{pokemon.moves &&
							pokemon.moves.map((x) => {
								return <Typography>{x.move.name}</Typography>;
							})}
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default Pokemon;
