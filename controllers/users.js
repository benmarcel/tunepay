const User = require("../schemas/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// register user

exports.signUp = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // checking if user already exist
    let user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ msg: "user already exist, login instead!" });

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // creating a new user
    user = new User({ name, email, phone, password: hashPassword, role });
    await user.save();

    // Generating jwt for authentication
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    req.session.token = token;

    // sending credentials to the clientSide
    res.status(200).json({
      msg: "User registered successfully",
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({ msg: "server error!" });
      console.error(error);
    }
  }
};

// user login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking if email provided is correct
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "invalid credentials" });
    }
    // checking password
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ msg: "invalid password" });
    }
    // Generating jwt token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    req.session.token = token;
    // sending credentials to the clientSide
    res.status(200).json({
      msg: "Login successful",
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({ msg: "server error!" });
      console.error(error);
    }
  }
};

// logout user
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(401)
        .json({ msg: "An error occurred logout unsuccessful!" });
    res.status(200).json({ msg: "Logout Successful!" });
  });
};

// user earns

exports.earn = (req, res) => {
  res.status(200).json({ msg: "user is earning" });
};
