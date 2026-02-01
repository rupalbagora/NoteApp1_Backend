import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const middleware=async(req,res,next)=>{
  try{
    // To verify the user we were use token, if the token is a valid token so the user will log in, so how we will receive the token , to receive the token we need to pass that from frontend
    const token= req.headers.authorization.split(' ')[1]
    if(!token){
      return res.status(401).json({success:false, message:"Unauthorized"})
    }
    const decoded = jwt.verify(token, "secretKeyofnoteapp123@#");
    if(!decoded){
      return res.status(401).json({ success: false, message: "Wrong token" });
    }
    const user = await User.findById({_id:decoded.id})
    if(!user){
      return res.status(404).json({ success: false, message: "no user" });
    }
    const newUser={name : user.name,id:user._id}
    req.user=newUser
    // next jha se middleware ko call kiya tha vha control bhej deta h
    next()
  }
  catch(error){
 return res.status(404).json({ success: false, message: "please login" });
  }
}

export default middleware;