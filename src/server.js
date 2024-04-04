require("express-async-errors")
require("dotenv/config")

const migrationsRun = require('./database/sqlite/migrations')
const AppError = require("./utils/AppError")
const routes = require("./routes");
const express = require("express");
const cors = require("cors");
const knex = require("./database/knex")

migrationsRun()
knex.migrate.latest()

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      statusCode: error.statusCode,
      message: error.message
    });
  };

  console.error(error)

  return response.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));