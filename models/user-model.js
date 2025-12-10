const mongoose=require('mongoose');
//according to industry standards we don't give connection here we gave it to config or utilities folder in seperate file only for connection 
//mongoose.connect("mongodb://127.0.0.1:27017/scatch");

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,
    },
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'//yaha humne product-model na likhke 'product' likha kyuki mongoose model ka naam product hai jo humne product-model.js file mein diya tha
    }],
    orders:{
        type:Array,
        default:[],
    },
    contact:Number,
    picture:String,
})
module.exports=mongoose.model("user",userSchema);