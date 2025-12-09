const userModel=require('../models/user-model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const {generateToken}=require('../utils/generateToken')//bringing generateToken from generateToken.js file
const Joi = require('joi'); // Import Joi for input validation


// Schema for validating registration input
const registerSchema = Joi.object({
    fullname: Joi.string().min(3).max(100).required(), // fullname: 3-100 chars, required
    email: Joi.string().email().required(), // email: valid email format, required
    password: Joi.string().min(6).required() // password: min 6 chars, required
});

// Schema for validating login input
const loginSchema = Joi.object({
    email: Joi.string().email().required(), // email: valid email format, required
    password: Joi.string().min(4).required() // password: min 6 chars, required
});


module.exports.registerUser=async(req,res)=>{
    try{
        let{fullname,email,password}=req.body
        // Validate registration input using Joi schema
        const {error: regError} = registerSchema.validate({ fullname, email, password }, { abortEarly: false });
        if (regError) {
            // If validation failed, extract error messages and send back
            const messages = regError.details.map(d => d.message);
            req.flash("error",messages.join(' | '))
            return res.redirect("/");
        }
        let existingUser=await userModel.findOne({email:email});
        if(existingUser) {
            req.flash("error","you already have an account")
            return res.redirect("/");
        }
         
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                //#IMPORTANT-->mongoDB schema less hota h toh agr aap koi bhi feild nhi doge (jaise email password fullname)still woh user create krr dega but we want ki jb tk saarein feild naa diye gye ho tb tk user create na ho then we use JOI package use krte h
                let user=await userModel.create({
                    email,
                    password:hash,
                    fullname,
                })
                //res.send(user);
                //const token=jwt.sign()
                //we'll be writing token in dofferent file of utils(generateToken.js)
                let token=generateToken(user);
                res.cookie("token",token);
                res.redirect('/shop')
            })
        })
        
         
    }
    catch(err){
        console.log(err.message);
        
    }
}


module.exports.loginUser=async(req,res)=>{

    let{email,password}=req.body;
    // Validate login input using Joi schema
        const { error: loginError } = loginSchema.validate({ email, password }, { abortEarly: false });
        if (loginError) {
            // If validation failed, extract error messages and send back
            const messages = loginError.details.map(d => d.message);
            req.flash("error",messages.join(' | '))
            return res.redirect("/");
        }
    let user=await userModel.findOne({email:email});
    if(!user) {
        req.flash("error","user doesn't exist")
        return res.redirect("/");
    }

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=generateToken(user);
            res.cookie("token",token);
            res.redirect('/shop')
        }
        else{
            req.flash("error","Incorrect email or password");
            return res.redirect("/");
        
        }
    })

    
}

//creating isLoggedIn middleware also protected route so that user joh logged In nhi h woh glti seh woh pages na khol le joh usse nhi khoolne chahiye the...that's why we need isLoggedIn middleare ....it will be created in middleware folder

module.exports.logout=(req,res)=>{
    res.cookie("token","");
    res.redirect('/');
}