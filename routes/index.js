const express=require('express');
const router=express.Router();
const{isLoggedIn}=require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');

router.get('/',(req,res)=>{
    //hmne isLoggedIn seh flash send kiya tha on any error on this route so we have req.flash("error","any message send");
    let error=req.flash("error");//message inside error name will saved in error variable
    res.render('index',{error});
})

router.get('/shop',isLoggedIn,async(req,res)=>{
    let products=await productModel.find();

    res.render('shop',{products});
})
router.get('/logout',isLoggedIn,(req,res)=>{
    res.render("shop");
})
module.exports=router;