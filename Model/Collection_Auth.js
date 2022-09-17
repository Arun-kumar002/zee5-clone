
import { Schema,model } from "mongoose";

let collectionSchema=new Schema({
    url:{
       type:String 
    },
    title:{
        type:String,
    }
})

export default model('collection',collectionSchema)