const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Name can not be empty"]
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: [8,"Password should contain atleast 8 characters"]
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: [function () {
      return this.password == this.confirmPassword;
    },"{VALUE} did not match the password"]
  },
  // createdAt:{
  //   type:Date,
  //   default:Date.now()
  // },
  role:{
    type:String,
    default:"admin"
  }

},{timestamps:true});


userSchema.pre("save",function(next){
  console.log("prehook is called");
  this.confirmPassword=undefined;
  next()
})

const roles=["admin","buyer","seller"];
userSchema.pre("save",function(next){ 
  let isPresent=roles.find(role=>role==this.role); 
  if(!isPresent){
    const error= new Error("Role is invalid");
    next(error);
  }
  next();
 })

 userSchema.pre("findOne", function (next) {
  console.log("user by id hook");
  console.log(this);
  this.select("-password");
  next();
})
 
const UserModel = mongoose.model("UserModel", userSchema);

module.exports = { UserModel};
  