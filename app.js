//npm init -y
//npm i express mongoose ejs bcrypt jsonwebtoken cookie-parser multer

const express=require("express")
const app=express()
const cookieParser=require('cookie-parser')
const path=require('path')
const db=require('./config/mongoose-connection')


const ownersRouter=require('./routes/ownersRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.use('/owners',ownersRouter);///owner seh related saari request bhej di jaaye ownersRoute p
app.use('/users',usersRouter);//user seh related saari request bhej di jaaye usersRoute p
app.use('/products',productsRouter);//product seh related saari request bhej di jaaye productsRoute p

app.listen(3000);