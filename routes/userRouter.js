const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//fires when user registers
router.post("/register", async (req, res) => {
  try {
    let { userName, password } = req.body;
    console.log(req.body);

    //checks to make sure both fields have been entered
    if (!userName || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    //checks to see if user already exists. If so, sends back error
    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this username already exists" });
    }

    //for safety, password is alterated using salt and hash. We do not want it visible in the database.
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //Create new user in the User document. Mongoose User model defines user document
    const newUser = new User({
      userName,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fires when user logs in or after registration
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(req.body);

    //checks if both fields are entered
    if (!userName || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    //look to see is user exists
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(400).json({
        msg: "Username does not exist. Please register or try again!",
      });
    }

    //checks to see if password is correct with one in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Incorrect password. Please try again" });
    }

    //if all correct a signed JWT is made and sent back to user. This is the token that allows the user to do anything in the site.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Allows me to delete user. Currently not being used. Done by MongoDB Atlas interface
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//checks to see if toke is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    userName: user.userName,
    id: user._id,
  });
});

module.exports = router;
