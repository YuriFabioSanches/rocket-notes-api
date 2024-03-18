//import da config do knex
const config = require("../../../knexfile");
//import do knex
const knex = require("knex");
//executando a função do knex passando nossa config
const connection = knex(config.development);
//export do módulo de connection do knex
module.exports = connection;