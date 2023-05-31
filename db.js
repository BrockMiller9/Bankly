/** Database setup for jobly. */

const { Client } = require("pg");
const { DB_URI } = require("./config");

process.env.PGPASSWORD = process.env.DB_PASSWORD;

const client = new Client(DB_URI);

client.connect();

module.exports = client;
