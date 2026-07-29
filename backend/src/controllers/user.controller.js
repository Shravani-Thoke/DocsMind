const UserModel = require("../models/users.model");

async function getMe(req, res) {
  try {
    const user = await UserModel.findById(req.user.id).select(
      "_id name email createdAt",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getMe,
};
