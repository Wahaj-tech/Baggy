//this file is only for connection of mongoDB

const mongoose=require('mongoose')


    mongoose.connect("mongodb://127.0.0.1:27017/scatch")
    //when we deploy we have to deal with this URL
    .then(()=>{
            console.log("mongoDB connected");
            //in usual use debugger instead of console.log ---search on chatGPT
    })
    .catch((err)=>{
        console.log("mongoDB connection error:",err);

    })

module.exports=mongoose.connection;