const express=require('express')
const router=express.Router();
const upload=require('../config/multer-config');
const productModel=require('../models/product-model');

router.get('/',function(req,res){
    
    res.send("hey it's working");
    
    
})
//in createproduct.ejs file we fave form action="/products/create"
//on submitting details we get all data from file to text color 
router.post('/create',upload.single('image'),async(req,res)=>{
    
    try{
        let {image,name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
        //res.send(req.file);//you will get a buffer data 
        // /*{
        //    "fieldname": "image",
        //    "originalname": "Snapchat-1888207166.jpg",
        //    "encoding": "7bit",
        //    "mimetype": "image/jpeg",
        //    "buffer": {
        //      "type": "Buffer",
        //      "data":a very big buffer data
        //     },
        //     "size": 357827 }*/
         let product=await productModel.create({
             image:req.file.buffer,
             name,
             price,
             discount,
             bgcolor,
             panelcolor,
             panelcolor,
             textcolor
        })
        req.flash("success","product created successfully")
        res.redirect('/owners/admin')
    }catch(err){
        res.send(err.message);
    }
})
module.exports=router; 