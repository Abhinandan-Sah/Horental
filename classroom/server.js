const express = require("express");
const app = express();
const users  = require("./routes/user.js");
const posts  = require("./routes/post.js");
const session = require("express-session")
// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

const sessionOptions ={ secret: "mysupersecretstring", resave: false, saveUninitialized:true }

app.use( session(sessionOptions) );

app.use("./user/", users);
app.use("./post/", posts);

app.get("/register", (req, res)=>{
    let {name = "ananynomous"} = req.query;
    req.session.name= name;
    res.redirect("/hello")
})

app.get("/hello", (req, res) =>{
    res.send(`Hello, ${req.session.name}`)
});

// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// })

app.get("/", (req, res)=>{
    res.send("Test Successful");
})

app.listen(8080, (req, res) =>{
    console.log(`Server is running at https://localhost:${8080}`);
})