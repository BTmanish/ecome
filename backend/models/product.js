import mongoose, { model } from "mongoose";

const productSchema = mongoose.Schema({
   "name":{
    type:String,
    require:true,
   },

   "model": {
     type:String,
     require:true
   },

   "price":{
    type:Number,
    require:true
   },
   
   "image":{
    type:String,
   },

  "Description":{
    type:String
  }
})

export default mongoose.model("product",productSchema);