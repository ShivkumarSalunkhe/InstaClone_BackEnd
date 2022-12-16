const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
// connect mongoose
// mongoose.connect("mongodb+srv://shivkumar:shivkumarproject@cluster0.ukvzdar.mongodb.net/InstaCloneDB")
mongoose.connect('mongodb+srv://shivkumar:shivkumarproject@cluster0.ukvzdar.mongodb.net/InstaCloneDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use(express.json());

app.use("/", require("./Routes/PostRoute"))


app.get("*", (req,res)=>{
    res.status(500).send("FAILD API")
})

app.listen(4000, ()=>{
    console.log("Server Is Up");
})






// username => shivkumar
// password => shivkumarproject
// IP address => 0.0.0.0 Anywhere
