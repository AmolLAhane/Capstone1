const express=require("express");
const productRouter=express.Router();
const {sanityMiddleware:payloadSanity}=require("../middlewares/sanityOfPayload");

const {getAllProducts,
   createProduct,
    deleteProduct,
  updateProduct,
  getProductById}
  =require("../controller/productController"); 
//product routes//
productRouter
.route("/")
.get(getAllProducts)
.post(payloadSanity,createProduct);

productRouter
.route("/:id")
.patch(updateProduct)
.delete(deleteProduct)
.get(getProductById)

module.exports={productRouter}