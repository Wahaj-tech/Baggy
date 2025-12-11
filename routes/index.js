const express=require('express');
const router=express.Router();
const{isLoggedIn}=require('../middleware/isLoggedIn');
const userModel=require('../models/user-model')
const productModel = require('../models/product-model');

router.get('/',(req,res)=>{
    //hmne isLoggedIn seh flash send kiya tha on any error on this route so we have req.flash("error","any message send");
    let error=req.flash("error");//message inside error name will saved in error variable
    res.render('index',{error,loggedin:false});//when there is no user we don't want to show myAccount and logout links so we will send Loogedin:false variable to index.ejs file
})

router.get('/shop',isLoggedIn,async(req,res)=>{
    let products=await productModel.find();
    let success=req.flash("success")
    res.render('shop',{products,success});
})

router.get("/cart",isLoggedIn,async(req,res)=>{
    let user = await userModel
    .findOne({ email: req.user.email })
    .populate('cart'); // cart = array of product objects

    let total = 0;
    user.cart.forEach(product => {
        const discountAmount = product.price * (product.discount / 100);
        const finalPrice = product.price - discountAmount;
        total += finalPrice;
    });
    // add platform fee (20)
    let totalAmount = total + 20;
    res.render('cart', { user, totalAmount });

})

router.get('/addtocart/:productid',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Product added to cart successfully");
    res.redirect('/shop');

});

module.exports=router;

/*router.get('/cart',isLoggedIn,async(req,res)=>{
    
    try{
        const user = await userModel.findById(req.user._id);
        const product = await productModel.findById(req.params.productid);
        if(!product) {
            req.flash('error','Product not found');
            return res.redirect('/shop');
        }
        // prevent duplicates
        const exists = user.cart.some(id => id.toString() === product._id.toString());
        if (exists) {
            req.flash('success','Product already in cart');
            return res.redirect('/shop');
        }
        user.cart.push(product._id);
        await user.save();
        req.flash("success","Product added to cart successfully");
        return res.redirect('/shop');
    }
    catch(err){
        console.log(err.message);
        req.flash('error','Could not add to cart');
        return res.redirect('/shop');
    }
}) */