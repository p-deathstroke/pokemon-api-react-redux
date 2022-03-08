const express = require("express");
const router = express.Router();

const axios = require("axios");

const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/", async (req, res) => {
	try {
		res.send("express server for pokemon api calls");
	} catch (error) {
		return res.status(404).json({ error: "Error from catch block: Error 404" });
	}
});

router.get("/pokemon/page/:page", async (req, res) => {
	let trace = "tracepokepage" + req.params.page;
	try {
		let pokeCacheData = await client.existsAsync(trace);

		if (pokeCacheData) {
			let pokeCacheData = await client.getAsync(trace);
			return res.send(JSON.parse(pokeCacheData));
		} else {
			const { data } = await axios.get(
				`https://pokeapi.co/api/v2/pokemon?offset=${
					req.params.page * 100
				}&limit=100`
			);

			await client.setAsync(trace, JSON.stringify(data));
			return res.send(data);
		}
	} catch (error) {
		return res.status(404).json({ error: "Error from catch block: Error 404" });
	}
});

router.get("/pokemon/:id", async (req, res) => {
	let trace = "tracepokeid" + req.params.id;

	try {
		let pokeCacheData = await client.existsAsync(trace);
		if (pokeCacheData) {
			let pokeCacheData = await client.getAsync(trace);
			return res.send(JSON.parse(pokeCacheData));
		} else {
			const { data } = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${req.params.id}`
			);
			await client.setAsync(trace, JSON.stringify(data));
			return res.send(data);
		}
	} catch (error) {
		return res.status(404).json({ error: "Error from catch block: Error 404" });
	}
});
module.exports = router;
