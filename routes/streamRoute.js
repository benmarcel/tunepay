const express = require("express");
const router = express.Router();
const auth = require("../userauth/auth");
const streamController = require("../controllers/Stream&earn");
const leaderBoard = require("../controllers/leaderboard");

router.get(
  "/allSongs",
  auth.isAuthenticated,
  auth.role("listener"),
  streamController.getAllSong
);

router.get(
  "/singleSong/:id",
  auth.isAuthenticated,
  auth.role("listener"),
  streamController.getSong
);

router.get(
  "/topSongs",
  auth.isAuthenticated,
  auth.role("listener"),
  leaderBoard.topSongs
);

router.get(
  "/topListeners",
  auth.isAuthenticated,
  auth.role("listener"),
  leaderBoard.topListeners
);
