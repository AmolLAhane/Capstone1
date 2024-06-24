const express = require("express");
const mongoose = require("mongoose");
//const path= require("path");
//require('dotenv').config({path:path.join(__dirname,"../",".env")});
require("dotenv").config();
const { USERID, MANGODBPASSWORD,PORT } = process.env;
console.log(USERID);
const app= express();
app.use(express.json());

const dbUrl = `mongodb+srv://${USERID}:${MANGODBPASSWORD}
@cluster0.cv4da56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 mongoose.connect(dbUrl)
 .then(()=>{
  console.log("db Connected")
 }).catch((err)=>{
  console.log(err.message)
 });

const ProductModel=require("../models/productModel");
 //route
 app.get("/api/user/:id",function(req,res){
  const {params,query}=req;
  res.json({queryParams:req.query,pathParams:params})
 })

 app.get("/api/product",async(req,res)=>{
  //sort paginate limit
const {query:{sort,page,limit}}=req;
let products=ProductModel.find();
if(sort){
let [prop,order]=sort.split("_");
//price:1->asc
//pric:-1->desc
order = order == "desc" ? - 1 : 1;
//page no//
// let page=query.page;
// let limit=query.limit;
console.log(prop,order,limit,page);
products=products.sort({[prop]:order});
}
if(limit && page){ 
let productToSkip=limit*(page-1);
products=products.skip(productToSkip).limit(limit);  
}

let data=await products;
if(data.length==0){
  console.log();
  res.status(400).json({msg:"data not found"});
}
res.status(200).json(data)
 })
 
app.listen(PORT, function (req, res) {
  console.log(`App is listening to the ${PORT}`);
});
