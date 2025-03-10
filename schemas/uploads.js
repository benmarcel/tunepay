const db = require("mongoose");

const uploadSchema = new db.Schema({
  title: { type: String, required: true },
  artist: { type: db.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = db.model("Songs", uploadSchema);
