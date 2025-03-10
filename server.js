const express = require("express");
const cors = require("cors");
const app = express();
const db = require("mongoose");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// default route

app.get("/", (req, res) => {
  res.status(200).send("Tunepay backend running");
});

// connect db

const connectDb = async () => {
  try {
    await db.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to db");
  } catch (error) {
    if (error) {
      console.error("Db connection error", error);

      process.exit();
    }
  }
};
connectDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
