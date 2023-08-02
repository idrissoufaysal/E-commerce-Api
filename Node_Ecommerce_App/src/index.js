const express=require('express')
const mongoose=require('mongoose')
const authRouter=require('./routes/auth.js');
const userRouter=require('./routes/user.js');
//const postRouter=require('./routes/posts');
///const catRouter= require("./routes/categories")

const app= express()

const port=2000;

//connection to the database
(async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1/E-commerce-Api")
        console.log("connection reussi avec la base de donnee mongodb");
    } catch (error) {
        console.log(error.message);
    }
  })()

app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
//app.use('/api/posts',postRouter)
//app.use('api/categories',catRouter)

app.get('/',(req,res)=>{
    res.send('bojour le monde commet alle vou')
})

app.listen(port,()=>
console.log('le serveur est lancer au port '+port))