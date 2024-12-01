const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const connectionRequest = require("../models/connectionRequest");
const requestRoute = express.Router();

requestRoute.post(
  "/profile/request/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(403).send("Status code is not valid");
      }
      const toUser = await User.findOne({ _id: toUserId });
      if (!toUser) {
        return res.status(400).send("User is not valid");
      }
      const inValidConnectionRequest = await connectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (inValidConnectionRequest) {
        return res.status(400).send("Connection request is invalid");
      }
      const connectionRequestData = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequestData.save();
      res.json({ message: "request accepted successfully", data });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

requestRoute.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.send(400).json({ message: "Status not allowed" });
      }
      const connectionRequests = await connectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequests) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }
      connectionRequests.status = status;
      const data = await connectionRequests.save();
      res.status(200).json({ message: "connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRoute;
