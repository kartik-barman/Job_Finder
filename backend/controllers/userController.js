import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

/**____________________________________________________________________*
 *                                                                     *
 *                      function to create a user                       *
 *              http://localhost:5000/api/users/create              *
 *                                                                     *
 *_____________________________________________________________________*/
export const createUserApi = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        msg: "Username and email already exists!..",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = User({
      ...req.body,
      username,
      email,
      password: hashPassword,
    });

    const saveUser = await newUser.save();

    res.status(201).json({
      success: true,
      msg: "User registered successfully!",
      user: saveUser,
    });
  } catch (error) {
    console.error("Errors : ", error);
    res.status(500).json({
      success: false,
      msg: "internal server error",
    });
  }
};

/**____________________________________________________________________*
 *                                                                     *
 *                    function to create a login                       *
 *              http://localhost:5000/api/users/login                  *
 *                                                                     *
 *_____________________________________________________________________*/

export const userLoginApi = async (req, res) => {
  const { email, password } = req.body;
  try {
    const login = await User.findOne({ email });

    // Check if the user was found
    if (!login) {
      return res.status(400).json({
        success: false,
        msg: "Unauthorized credentials",
      });
    }

    // Compare the passwords
    const isPasswordValid = await bcrypt.compare(password, login.password);

    const token = jwt.sign(
      { userid: login._id, email },
      process.env.SECRET_CODE,
      { expiresIn: "5m" }
    );
    if (isPasswordValid) {
      return res.status(200).json({
        success: true,
        msg: "Logged in successfully.",
        token,
        user: {
          userid: login._id,
          username: login.username,
          email,
          role: login.role,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Unauthorized credentials",
      });
    }
  } catch (error) {
    console.error("Errors: ", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
