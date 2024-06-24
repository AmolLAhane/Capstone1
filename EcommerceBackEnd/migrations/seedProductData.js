//stes for migration
//1. conect to DB
//2.identify the collection/model whereyou want to make the changes
//3.get the list of entries and identify the query will be used and apply it
//UpdateMany, deleteMany, insertMany
//4.colse the connection

const ProductModel=require("../models/productModel");
const productList=require("../json/products");

function seedProductData(model,entries){
  const mongoose=require("mongoose");
  const dotenv=require("dotenv");
  dotenv.config();
  const {USERID,MANGODBPASSWORD}=process.env;

  const dbUrl = `mongodb+srv://${USERID}:${MANGODBPASSWORD}@cluster0.cv4da56.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 mongoose.connect(dbUrl)
 .then(()=>{
  console.log("db Connected");
  console.log("dropping existing model");

  //insert data
return model.collection.drop();

 })
 .then(()=>{
    console.log("inserts document in db");
    //insert data
  return model.insertMany(entries);  
   })
 .catch((err)=>{

  console.log(err.message);
 })
 .finally(()=>{
    console.log("documents added");
    mongoose.disconnect();
    console.log("connection closed");
 });
}
seedProductData(ProductModel,productList);