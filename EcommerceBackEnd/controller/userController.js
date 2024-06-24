const  UserModel  = require("../models/userModel");
const {createResource,
  getAllResource,
  deleteResource,
  updateResource,
  getResourceById,
}=require("../utils/resourceFactory");

const getAllUsers=getAllResource(UserModel);

const createUser=createResource(UserModel);

const deleteUser=deleteResource(UserModel);
const updateUser=updateResource(UserModel);
const getUserById=getResourceById(UserModel);

module.exports={
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
}