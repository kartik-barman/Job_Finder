import express from "express";
import  {createUserApi, fethcUsersApi, userLoginApi}  from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/create", createUserApi);
userRouter.post("/login", userLoginApi);
userRouter.get("/", fethcUsersApi)

export default userRouter