const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Connects mongoose to MongoDB atlas.
var mongoDB = process.env.MONGODB_URI;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection successful"));

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error"));

app.use(express.static(path.join(__dirname, "/client/build")));
let fileLoc = "";

//Shows app which file to run in production mode
if (process.env.NODE_ENV === "production")
  fileLoc = path.join(__dirname + "/client/build/index.html");
else fileLoc = path.join(__dirname + "/client/build/index.html");

//Two routes for users and posts
app.use("/users", require("./routes/userRouter"));
app.use("/posts", require("./routes/postRouter"));
app.get("*", (req, res) => {
  res.sendFile(fileLoc);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
