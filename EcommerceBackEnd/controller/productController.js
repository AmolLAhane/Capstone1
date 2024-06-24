const  ProductModel  = require("../models/productModel");
const {createResource,
  getAllResource,
  deleteResource,
  updateResource,
  getResourceById,
}=require("../utils/resourceFactory");

const getAllProducts=getAllResource(ProductModel);
const createProduct=createResource(ProductModel); 
const deleteProduct=deleteResource(ProductModel);
const updateProduct=updateResource(ProductModel);
const getProductById=getResourceById(ProductModel);

module.exports={
 getAllProducts,
 createProduct,
 deleteProduct,
 updateProduct,
 getProductById,
};