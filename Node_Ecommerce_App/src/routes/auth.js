const router=require('express').Router()
const User=require('../models/User');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
//Register
router.post('/register',async(req,res)=>{
    const salt= await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    
    const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPassword
})
    

try {
        const savedUser= await newUser.save();
        res.status(200).json(savedUser)
    } 
catch (e) {
        res.status(500).json(e)
}})

//Login
router.post('/login',async(req,res)=>{
   try {
     const user= await User.findOne({username:req.body.username})
     !user && res.status(401).json('wromg credentials')
 
    const validatePass= await bcrypt.compare(req.body.password,user.password)
        !validatePass && res.status(400).json("wrong credential");

        const accessToken= jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin 
        },
        "secrete",
        {expiresIn:"3d"})


    const {password, ...others}=user._doc; 
        res.status(201).json({...others, accessToken})
   } catch (e) {
       res.status(500).json(e)
   }

})

module.exports=router 