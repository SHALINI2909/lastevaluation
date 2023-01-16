const express = require("express");
const { connection } = require("./configs/db");
const cors = require("cors");
const {userRouter}=require("./routes/user.router");
const {authenticate}=require("./middlewares/authenticate.middleware");
const {postRouter}=require("./routes/post.route")
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts", postRouter)

app.get("/", (req, res) => {
  res.send("Welcome to HomePage");
});



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Trouble to Connect to the DB");
    console.log(err);
  }

  console.log(`Server is running on Port ${process.env.port}`);
});
