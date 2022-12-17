const express = require("express")
const Post = require("../Models/Models")
const router = express.Router()
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://shivkumar:shivkumarproject@cluster0.ukvzdar.mongodb.net/InstaCloneDB")


////

const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')

router.use(fileUpload({
    useTempFiles : true,
}))

cloudinary.config({ 
    cloud_name: 'dpe6qjg5t', 
    api_key: '924817626568466', 
    api_secret: 'D-SbvS4uCXD3VdsqlP8grdz46dU'
  });

router.post("/create", async(req,res)=>{
    try{
   

    const file = req.files.PostImage;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        pulic_id: `${Date.now()}`,
        resource_type: "auto",
        folder: "Images"
        
    })
    console.log(req.body)

    const post = await Post.create({
        name:req.body.name,
        PostImage:result.url,
        // PostImage:req.body.PostImage,
        likes: Math.floor(Math.random()*100),
        location:req.body.location,
        Description:req.body.Description,
        date: req.body.date
    })

        res.json({
            status: "success",
            post:post 
        })
    }
    catch(e){
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})



router.route("/posts").get((req, res)=>{
    Post.find()
        .then(foundPosts => res.json(foundPosts.reverse()))

})


module.exports= router;






