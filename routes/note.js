import express from 'express'
import Note from '../models/Note.js';
import middleware from '../middleware/middleware.js';
const router = express.Router()
router.post('/add',middleware,async(req,res)=>{
  try {
    const { title, description } = req.body;
    const newNote = new Note({
      title,
      description,
      // now we nedd user id , so how we get the userId, we have to verify the user is this the validated user or not whoever want to create note should be a logged in user so for that we have to create middleware to check the validity of user
      userId:req.user.id
    });
    await newNote.save();
    return res
      .status(200)
      .json({ success: true, message: "Note successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in Adding Note" });
  }
})

router.get('/',middleware, async(req,res)=>{
  try{
    const notes = await Note.find({userId:req.user.id})
    return res.status(200).json({success:true,notes})
  }
  catch(error){
    return res.status(500).json({success:false, message:"can't retrieve"})
  }
})
router.put('/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    const updateNote= await Note.findByIdAndUpdate(id,req.body)
    return res.status(200).json({ success: true, updateNote });
  }
  catch(error){
    return res.status(500).json({success:false, message:"can't update notes"})
  }
})
router.delete('/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    const updateNote= await Note.findByIdAndDelete(id)
    return res.status(200).json({ success: true, updateNote });
  }
  catch(error){
    return res.status(500).json({success:false, message:"can't delete notes"})
  }
})
export default router;