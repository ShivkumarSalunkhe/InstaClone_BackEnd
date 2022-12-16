const express = require("express")
const Post = require("../Models/Models")
const router = express.Router()
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://shivkumar:shivkumarproject@cluster0.ukvzdar.mongodb.net/InstaCloneDB")
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
    console.log(req.body)
    // console.log(req.body.PostImage)
    const file = req.files.PostImage;
    // console.log(result.url)
    
   
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        pulic_id: `${Date.now()}`,
        resource_type: "auto",
        folder: "Images"
        
    })
    

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
        .then(foundPosts => res.json(foundPosts))

})


module.exports= router;













// router.route("/create").post((req, res)=>{
//     const PostImage = req.body.PostImage
//     const name = req.body.name;
//     const location = req.body.location
//     const Description = req.body.Description
//     const likes = req.body.likes
//     const date =  req.body.date
    
//     const newPost = new Post({
//         name,
//         location,
//         likes,
//         Description,
//         date,
//         PostImage
//     })
//     newPost.save()

// })


// router.route("/posts").get((req, res)=>{
//     Post.find()
//         .then(foundPosts => res.json(foundPosts))

// })
// module.exports= router;





// const cloudinary = require('cloudinary')


// cloudinary.config({ 
//     cloud_name: 'dpe6qjg5t', 
//     api_key: '924817626568466', 
//     api_secret: 'D-SbvS4uCXD3VdsqlP8grdz46dU' 
//   });

//   const file = req.files.PostImage;
//     const result = cloudinary.UploadStream.upload(file.tempFilePath, {
//         pulic_id: `${Date.now()}`,
//         resource_type: "auto",
//         folder: "Images"
//     })