const express=require("express");
const userRouter=express.Router();
const {sanityMiddleware:payloadSanity}=require("../middlewares/sanityOfPayload");
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById
}=require("../controller/userController");

userRouter
.route("/")
.get(getAllUsers)
.post(payloadSanity,createUser)

userRouter
.route("/:id")
.get(getUserById)
.patch(updateUser)
.delete(deleteUser)

module.exports={userRouter}