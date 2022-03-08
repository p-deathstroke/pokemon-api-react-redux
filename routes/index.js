const pokemonRoutes = require("./pokemon");

const constructorMethod = (app) => {
	app.use("/", pokemonRoutes);
	app.use("*", (req, res) => {
		return res.status(404).json({ error: "Error from * : Page not found" });
	});
};

module.exports = constructorMethod;
