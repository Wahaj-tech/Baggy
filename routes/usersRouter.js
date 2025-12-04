const express=require('express')
const router=express.Router();
const {registerUser}=require('../controller/authController');

router.get('/',function(req,res){
    res.send("hey it's working");
})
router.post('/register',registerUser)
module.exports=router;