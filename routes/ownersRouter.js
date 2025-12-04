const express=require('express')
const router=express.Router();
const ownerModel=require('../models/owner-model');


router.get('/',function(req,res){
    res.send("hey it's working");
})


//console.log(process.env.);//it will give lots of environment variable must comment htao aur dekho pta chl jayega 
//console.log(process.env.DEBUG);//we will get development:* as hmne hi yeh env variable bnaya tha 
//now setting one more env variable i'll write>>$env:NODE_ENV="development" so that we can apply condition ki /owner/ route tbhi chale jb yeh condition true ho...
if(process.env.NODE_ENV=="development"){//env stands for environment ,we are storing these environment variable in our memory -->just like $env:DEBUG = "development:*" we
    console.log("hey");
    //if i want ki yeh route sirf aur sirf development phase m chalana h so if in future hmne glti seh upload(deploy) krr bhi diya and dhyaan nhi diya toh bhi yeh bs development k wqt hi available rhega 

    router.post('/create',async (req,res)=>{
        let owner=await ownerModel.find();
        if(owner.length>0){
            return res.status(503).send("You don't have permission to create a new owner");
        }
        let{fullname,email,password}=req.body;
        let createdOwner=await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner);
    })
}




module.exports=router;