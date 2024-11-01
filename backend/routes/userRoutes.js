import express from "express";
import  {createUserApi, deleteUserApi, fethcUsersApi, userLoginApi}  from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/create", createUserApi);
userRouter.post("/login", userLoginApi);
userRouter.get("/", fethcUsersApi)
userRouter.delete("/delete/:id", deleteUserApi)

export default userRouter