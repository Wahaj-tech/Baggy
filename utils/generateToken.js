const jwt=require('jsonwebtoken');

const generateToken=(user)=>{//this stores token in a constant variable named generateToken
    return jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY);
};
module.exports.generateToken=generateToken;
//in the above line generateToken after equal is our arrow function in which our token got saved and in left side module.exports.generateToken ,here we are making an property generateToken on that module.exports object ,we can give any name like module.exports.token also ,so we are exporting our arrow function as GenerateToken name


//IMPORTANT we are exporting a property from this file so we have to import like this--> const {generateToken}=require("path of this file") 