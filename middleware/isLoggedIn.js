const jwt=require('jsonwebtoken')
const userModel=require('../models/user-model')

module.exports.isLoggedIn=async(req,res,next)=>{
    if(req.cookies.token==""){
        req.flash("error","you need to login first");
        //in req.flash("name","message");
        return res.redirect('/');
        //hmne flash message kisi bhi doosre route p create kr diya to check user loggged in h ya nhi...after creating flash we redirect that to "/" route toh hm flash message "/" route p bhi access krr payenge...flash message is powerful cheez hai for one time message 
    }
    try{
        let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);//on decoding we get email and id of user as it is being sent while generating token through jwt.sign({email,id})
         
        let user=await userModel
        .findOne({email:decoded.email})//user k saara data aajyega
        .select("-password");//it states that ,user k saarein data seh minus password ...not taking password from user
        req.user=user;
        next();
    }
    catch(err){
        req.flash("error","something went wrong");
        res.redirect("/")//error-->something went wrong will be shown on "/" route
    }
}
//flash message k sabse bdha use hai ki jb kisi aur route p ho aur aapko kuch data/message kisi route p bhejna h toh aap yeh flash k use krte ho...