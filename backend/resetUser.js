// resetUser.js
const mongoose = require("mongoose");
const User = require("./src/models/user"); // path to your user model
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/videoApp");

const resetUser = async () => {
  try {
    // Delete old test user
    await User.deleteMany({ email: "test@example.com" });

    // Create new test user WITHOUT manual hashing
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "123456", // <-- plain password, let pre-save hook hash it
    });

    await user.save();
    console.log("✅ Test user reset successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

resetUser();

