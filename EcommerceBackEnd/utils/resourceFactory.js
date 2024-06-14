

const createResource=function(modelName){
  console.log(modelName,"method created");
   return async (req,res)=>{
    try{
      console.log("Create method called");
      const resourceData=new modelName(req.body);
      const data=await resourceData.save();
      if(data) res.status(200).json({message:"data added successfully",data});
      else res.status(400).json({message:"data could not be added",data});
    }catch(err){
      res.status(500).json({
        message:err.message
      })
    }
   }
  }
const getAllResource=function(modelName){
 return async (req, res) => {
  try {
    
    let allResources = await modelName.find();
    if (allResources.length != 0) {
      res.status(200).json({
        message: "resource  list",
        data: allResources,
      })
    } else {
      res.status(400).json({
        message: "data not found"
      })
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }

}
}
const deleteResource=function(modelName){
 return async(req, res) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      //search my DB  for id
      let deleteResource= await modelName.findOneAndDelete(id);
    
      //delete if user is found
      if (!deleteResource) {
        res.status(400).json({
          message: "data not found",
        });
      } else {
        //result with success message
        res.status(200).json({ message: "resource deleted successfully",user:deleteResource});
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
const updateResource=function(modelName){
  return async(req,res)=>{
    try{
  const {id}=req.params;
  const dataToBeUpdated=req.body;
  const updatedResource= await modelName.findByIdAndUpdate(id,dataToBeUpdated,
    {returnDocument:'after',upsert:true});
  if(updateResource){
    res.status(200).json({
      message:"resource Updated",
      data:updateResource
    })
  }else{
    res.status(400).json({
      message:"data could not be updated"
  
    })
  }
    }catch(err){
      res.status(500).json({
        message:err.message
      })
    }
  }
}
const getResourceById=function(modelName){
  return async (req, res) => {
    try {
      let { id } = req.params;
      //search my Db for id//
      const resource = await modelName.findById(id);
      console.log(user);
      //return if user is found//
      if (!resource) {
        res.status(400).json({
          message: "data not found",
        });
      } else {
        //return the user
        //res with suceess message//
        res.status(200).json({ data: resource });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
module.exports={
  createResource,
  getAllResource,
  deleteResource,
  updateResource,
  getResourceById
}