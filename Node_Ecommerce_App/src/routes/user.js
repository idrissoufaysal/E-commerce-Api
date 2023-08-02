const router=require('express').Router()
const bcrypt=require("bcryptjs")
const User = require('../models/User')
const {veryfyToken, verifyTokenAndAuthotization} = require('./verifyToken')


router.put('/:id',verifyTokenAndAuthotization,async(req,res)=>{
    //let salt= await bcrypt.genSalt(10)
    let hashPassword = await bcrypt.hash(req.body.password,20)
    
    if(req.body.password){
        req.body.password=hashPassword
}
try {
    const updateUser= await User.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {new:true});
        res.status(200).json(updateUser); 

} catch (e) {
    res.status(500).json(e)
} 
})
//
/*router.get('/',async(req,res)=>{

})

//
router.post('/',async(req,res)=>{

})

//
router.get('/:id',async(req,res)=>{

})

//
router.put('/:id',async(req,res)=>{


})

//
router.delete('/:id',async(req,res)=>{

})*/

module.exports= router