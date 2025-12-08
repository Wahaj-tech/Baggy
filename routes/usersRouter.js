const express=require('express')
const router=express.Router();
const {registerUser}=require('../controller/authController');
const {loginUser}=require('../controller/authController');
const{logout}=require('../controller/authController')

router.get('/',function(req,res){
    res.send("hey it's working");
})
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);
module.exports=router;