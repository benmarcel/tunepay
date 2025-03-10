const Songs = require("../schemas/uploads");

// upload music

exports.upload = async (req, res) => {
  const { title, url } = req.body;
  // checking if all fields are provided
  if (!title || !url) {
    return res.status(404).json({ msg: "All fields are required!" });
  }
  try {
    // checking if song already exist on the database

    const existingSong = await Songs.findOne({ url });
    if (existingSong)
      return res.status(400).json({ msg: "Song already exist!" });

    // uploading song on the database
    const song = new Songs({ title, url, artist: req.user.id });
    await song.save();
    res.status(200).json({ msg: "Upload Successful!" });
  } catch (error) {
    if (error) {
        res.status(500).json({ msg: "server error!" });
        console.error(error);
      }
  }
};
