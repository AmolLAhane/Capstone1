const { productModel } = require("../models/productModel");

const getAllProducts= async (req, res) => {
  try {
    console.log("send data of all the users");
    let allData = await ModelX.find();
    if (allUsers.length != 0) {
      res.status(200).json({
        message: "user data list",
        data: allUsers,
      })
    } else {
      res.status(400).json({
        message: "No user found"
      })
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }

}
const createProduct=async (req, res) => {
  try {
    //console.log(req.body);
    //get the new user
    let newUser =await UserModel(req.body);

    const user = await newUser.save();
    if (user) res.status(200).json({
      message: "user added successfylly",
      user
    });
    else res.status(400).json({
      message: "user could not be registered",
      user
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
const deleteProduct=async(req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    //search my DB  for id
    let deletedUser= await UserModel.findOneAndDelete(id);
  
    //delete if user is found
    if (!deletedUser) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      //result with success message
      res.status(200).json({ message: "user deleted successfully",user:deletedUser});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const updateProduct=async(req,res)=>{
  try{
const {id}=req.params;
const dataToBeUpdated=req.body;
const updatedUser= await UserModel.findByIdAndUpdate(id,dataToBeUpdated,
  {returnDocument:'after',upsert:true});
if(updatedUser){
  res.status(200).json({
    message:"User Profile Updated",
    user:updatedUser
  })
}else{
  res.status(400).json({
    message:"user profile could not be updated"

  })
}
  }catch(err){
    res.status(500).json({
      message:err.message
    })
  }
}
const getProductById=async (req, res) => {
  try {
    let { userid } = req.params;
    //search my Db for id//
    const user = await UserModel.findById(userid);
    console.log(user);
    //return if user is found//
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      //return the user
      //res with suceess message//
      res.status(200).json({ data: user });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports={
  getAllProducts,createProduct,deleteProduct,updateProduct,getProductById
}