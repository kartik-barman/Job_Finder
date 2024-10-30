import express from "express";
import  {createUserApi, userLoginApi}  from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/create", createUserApi);
userRouter.post("/login", userLoginApi);

export default userRouter