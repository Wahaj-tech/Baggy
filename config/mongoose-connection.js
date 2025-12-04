//this file is only for connection of mongoDB

const mongoose=require('mongoose')
//debugger-->npm i debug config
const dbgr=require('debug')("development:mongoose")//development,mongoose is a variable we can anything in place of development
//hmne environment variable development bnayi h toh file name bhi development.json hona chahiye with correct spelling
//- `debug` is a logging library.
//- It prints logs only if the environment variable `DEBUG` matches the namespace.`"development:mongoose"` is the **namespace**.
const config=require('config')
    mongoose.connect(`${config.get("MONGODB_URI")}/baggy`)
    //when we deploy we have to deal with this URL
    .then(()=>{
            //console.log("mongoDB connected");
            //in usual use debugger instead of console.log ---debugger print nothing on terminal unlike in case of console.log ,it print only when we set up environment variables.
            //environment variable setting up syntax-->
            //set DEBUG=development:*  or $env:DEBUG = "development:*"     DEBUG is our environment variable jisme development seh related saarein namespace k messages show krna
            //if we want ki kuch bhi na print ho toh DEBUG=    blank chor do
            //go to terminal type set DEBUG=development:* and enter then nodemon app.js u wil see development:mongoose mongoDB connected +0ms
            dbgr("mongoDB connected");
    })
    .catch((err)=>{
        dbgr("mongoDB connection error:",err);

    })

module.exports=mongoose.connection;