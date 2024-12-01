const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  status: {
    type: String,
    require: true,
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: "{VALUE} is not correct for status",
    },
  },
});

connectionRequestSchema.index({
  fromUserId: 1,
  toUserId: 1,
});

const connectionRequest = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = connectionRequest;
