
const mongoose = require("mongoose")

const InstaSchema={
    name:String,
    location:String,
    Description:String,
    likes:Number,
    date: { type: Date, default: Date.now() },
    PostImage:String
}

const Post = mongoose.model("Post", InstaSchema)

module.exports= Post;