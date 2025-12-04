const userModel=require('../models/user-model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const {generateToken}=require('../utils/generateToken')//bringing generateToken from generateToken.js file

module.exports.registerUser=async(req,res)=>{
    try{
        let{fullname,email,password}=req.body
        let existingUser=await userModel.findOne({email:email});
        if(existingUser) return res.status(401).send("You already have an account");
         
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                //#IMPORTANT-->mongoDB schema less hota h toh agr aap koi bhi feild nhi doge (jaise email password fullname)still woh user create krr dega but we want ki jb tk saarein feild naa diye gye ho tb tk user create na ho then we use JOI package use krte h
                let user=await userModel.create({
                    email,
                    password:hash,
                    fullname,
                })
                res.send(user);
                //const token=jwt.sign()
                //we'll be writing token in dofferent file of utils(generateToken.js)
                let token=generateToken(user);
                res.cookie("token",token);
            })
        })
        
         
    }
    catch(err){
        console.log(err.message);
        
    }
}