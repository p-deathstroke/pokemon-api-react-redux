const bluebird = require("bluebird");
const { ApolloServer, gql } = require("apollo-server");
const cors = require("cors");
const express = require("express");
const redis = require("redis");

const app = express();
app.use(cors());
const configRoutes = require("./routes");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log("Your routes will be running on http://localhost:3000");
});
