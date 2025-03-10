const db = require("mongoose");

const streamsSchema = new db.Schema({
  listeners: { type: db.Schema.Types.ObjectId, ref: "User", required: true },
  song: { type: db.Schema.Types.ObjectId, ref: "Songs", required: true },
  timeStamp: { type: Date, default: Date.now },
});


module.exports = db.model("Streams", streamsSchema)