const express = require("express");
const cors = require("cors");
const db = require("./db/models");

const movieRoutes = require("./routes/movies");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/user");

const passport = require("passport");
const { localStrategy } = require("./middleware/passport");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);
app.use("/user", userRoutes);
app.use(passport.initialize());
app.use(passport.initialize());
passport.use(localStrategy);

//path not found middleware
app.use((_, response, __) => {
  response.status(404).json({ message: "Path not found" });
});

//error handling middleware
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    message: error.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    app.listen(process.env.PORT, () => {
      console.log("Express app started seccefully");
      console.log(`Running on ${ip.adress()}:${process.env.PORT}`)
    });
    
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
