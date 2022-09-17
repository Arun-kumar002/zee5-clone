import { Schema,model } from "mongoose";


let productSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    url:{
        type:String,
    },
    category:{
        type: Array,
    },
    language:{
        type:String,
    },
    generes:{
        type:String,
    },
    Rating:{
        type:String,
    },
    certificate:{
        type:String,
    },
    casting:{
        type:String,
    }

},{timestamps:true});


export default model('movies',productSchema);
