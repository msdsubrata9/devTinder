const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileFields } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileFields(req)) {
      throw new Error("Invalid Edit request");
    }
    const loggedInUserData = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUserData[key] = req.body[key];
    });
    await loggedInUserData.save();
    res.json({
      message: `${loggedInUserData.firstName}, your profile has been updated successfully`,
      data: loggedInUserData,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
