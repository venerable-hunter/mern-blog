const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Post = require("./models/post.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer  = require('multer')
const fs =require('fs');




// following line is for handling multer middleware

const uploadMiddleware =multer({dest:'uploads/'})

app.use('/uploads', express.static(__dirname+ '/uploads'))


// this following line generates the salt for you to be used in
// the process of ecrypting the password bfore saving it to the db using bcrypt 
const salt = bcrypt.genSaltSync(10);

// following line creates the salt to be used in jwt during login
const secret ='chaturanshmauryaBCA6sem'
 
app.use(cors({credentials:true, origin:'http://127.0.0.1:5173'}));

app.use(express.json());
app.use(cookieParser());






mongoose.connect(
    "mongodb+srv://anujstech77101:WkTPNLitJJHFXoSA@cluster0.8rbhxye.mongodb.net/"
  )
  .then(() => console.log("Connected!"));




app.get("/", function (req, res) {
  res.send("Hello  Wurld");
});



app.post("/register", async function (req, res) {
  const { username, useremail, userphone, userpassword } = req.body;
  try {
    const userDoc = await User.create({
      name: username,
      phone: userphone,
      email: useremail,
      password: bcrypt.hashSync(userpassword, salt),
    });
    res.json(userDoc);
  } catch (error) {
    console.log(
      `${errror} has occured while creating new user in /rgister route`
    );
  }
});




app.post("/login", async  function (req, res) {


    // try {
      
    //   } catch (error) {
    //     console.log(
    //       `${errror} has occured while creating new user in /rgister route`
    //     );
    //   }



  const {email, password}= req.body;
  const userDoc = await User.findOne({email})
  const passOk= bcrypt.compareSync(password,userDoc.password)
  
  if(passOk)
    {
        // Following is code is for what happens after a user has succesfully logged in.

        jwt.sign({username:userDoc.name, id:userDoc._id}, secret,{},(err,token)=>{

            if(err) throw err;
            res.cookie('token',token).json('ok')
        })
    }else{
        res.status(400).json('wrong credentials')
    }

});


// THE FOLLOWING CODE IS FOR VALIDATING THE TOKEN AND COOKIES .
//  WHAT IT DOES IS EVERYTIME THE USER LOADS THE HOMEPAGE A FETCH RQUEST IS MADE AND AND THE COOKIES ARE SENT TO THE SERVER WHICH THEN VALIDATES AND
//  IF USER USER IS VALID THEN USER'S PROFILE IS SENT

app.get("/profile", function (req, res) {
    const {token}= req.cookies;
    jwt.verify(token, secret, {}, (err,info)=>{
        if(err) throw err;

        res.json(info);
    })
    
  });
  

  app.post("/logout", function (req, res) {
    res.cookie('token','').json('loggedout')
    
  });


// following endpoint is for creating the post
  app.post("/post", uploadMiddleware.single('file'), async function (req, res) {
    console.log('new post created')
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath =  path+'.'+ext;
    fs.renameSync(path, newPath)

    // console.log(parts)

    // res.json({ext})
    
    // following lines  take send data to DB
   

// follwing line is to get the user id from cookies token
    const {token}= req.cookies;
    jwt.verify(token, secret, {}, async (err,info)=>{
        if(err) throw err;

        // res.json(info);
        const {title,summary,content} = req.body;
        const postDoc =await  Post.create({
            title:title,
            summary:summary,
            content:content,
            cover:newPath,
            author:info.id,
        })
        res.json(postDoc)
    })
    

 


   
  });
  


// following endpoint is for fetching all the post  from db a displaying it.
app.get("/post", async function (req, res) {
    console.log('fetch post accessed')
    res.json(await Post.find().populate('author').sort({createdAt:-1}).limit(20))
    
  });


  //following lines send the data of a requested post
  app.get('/post/:id', async function (req, res){
    const {id} =req.params;
    const postDoc =await Post.findById(id).populate('author')
    res.json(postDoc)
  })

//   following lines updates a post
app.put('/post', uploadMiddleware.single('file'), async function (req,res){
    // res.json(req.file)
    let newPath =null;
    if(req.file){
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath =  path+'.'+ext;
        fs.renameSync(path, newPath)

    }
    const {token}= req.cookies;
    jwt.verify(token, secret, {}, async (err,info)=>{
        if(err) throw err;

        const {id,title,summary,content} = req.body;


        const postDoc = await Post.findById(id)
        const isAuthor = postDoc.author == info.id;
    // res.send({postDoc,info})
        
        if(!isAuthor){
           return  res.status(400).json('you are not hte author')
             
        }
       const updatesrep= await Post.updateOne({_id: postDoc._id},{$set:{
            title:title,
            summary:summary,
            content:content,
            cover: newPath ? newPath : postDoc.cover
        }},{upsert:true});
         
    // await postDoc.update({
    //     title,
    //     summary,
    //     content,
    //     cover: newPath ? newPath : postDoc.cover,
    // })
       res.json(updatesrep)
        // res.json(postDoc);
       
       
    })

})


app.listen(3000);

// //anujstech77101
// //WkTPNLitJJHFXoSA
// mongodb+srv://anujstech77101:<password>@cluster0.8rbhxye.mongodb.net/
