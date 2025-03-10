const Songs = require("../schemas/uploads");
const Streams = require("../schemas/streams");
const users = require("../schemas/User");

// top songs

exports.topSongs = async (req, res) => {
  try {
    const getTopSongs = await Streams.aggregate([
      { $group: { _id: "$Songs", Count: { $sum: 1 } } }, //grouping song by id, and counting them
      { $sort: { Count: -1 } }, // sorting songs by count in a descending order
      { $limit: 5 },
    ]);

    // getting song details from the songs model
    const topSongs = await Songs.populate(getTopSongs, {
      path: "_id",
      select: "title, url, artist",
    });

    //   sending the top song ro the client-side
    res.status(200).json({ topSongs });
  } catch (error) {
    if (error) {
      res.status(500).json({ msg: "Server error!" });
      console.error(error);
    }
  }
};

// top listeners

exports.topListeners = async (req, res) => {
  try {
    const getTopListeners = await Streams.aggregate([
      { $group: { id: "$listeners", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const topListeners = await users.populate(getTopListeners, {
      path: "_id",
      select: "name, email",
    });
    res.status(200).json({ topListeners });
  } catch (error) {}
};
