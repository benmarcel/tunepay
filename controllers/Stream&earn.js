const Songs = require("../schemas/uploads");
const Streams = require("../schemas/streams");

// get all songs
exports.getAllSong = async (req, res) => {
  try {
    const songs = await Songs.find().populate("artist", "name");

    // check if songs are available
    if (songs.length == 0) {
      return res.status(404).json({ msg: "No songs available" });
    }

    res.status(200).json({ songs });
  } catch (error) {
    if (error) {
      res.status(500).json({ msg: "An error occurred!" });
      console.error(error);
    }
  }
};

// get a song

exports.getSong = async (req, res) => {
  const songId = req.params.id;

  try {
    // find song that matches the songId
    const song = await Songs.findById(songId);
    if (!song) return res.status(400).json({ msg: "Song not available!" });

    // check if song has been streamed that day
    const existingStream = await Streams.findOne({
      listener: req.user.id,
      song: song._id,
      timeStamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    if (existingStream)
      return res
        .status(400)
        .json({ msg: "song has already been streamed today" });

    // saving new stream
    const stream = new Streams({ listener: req.user.id, song: song._id });

    await stream.save();

    res
      .status(200)
      .json({ song, msg: "Song is being streamed, you've earned 1 point" });
  } catch (error) {
    if (error) {
      res.status(500).json({ msg: "An error occurred!" });
      console.error(error);
    }
  }
};


