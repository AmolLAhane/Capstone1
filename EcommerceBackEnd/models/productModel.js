const { Timestamp, TypedEventEmitter } = require("mongodb");
const { Schema, model } = require("mongoose");
const { validate } = require("uuid");

const productSchema= new Schema({
name:{
  type:String,
  required:true,
  minLength:[4,"product name should have atleast 4 characters"]
},
price:{
  type:Number,
  required:true,
  min:[0,"price can't be negative"]
},
discount:{
  type:Number,
  default:0,
  validate:[function(){
    return this.price>=this.discount
  },"discount can't be more than price"]
},
description:String,
brand:String,
category:{  
type:String,
default:"Miscellenous",  
required:true 
}
},{timestamp:true})

const ProductModel=model("productModel",productSchema);
module.exports= ProductModel;
