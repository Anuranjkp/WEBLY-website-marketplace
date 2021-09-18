const { response } = require('express');
var express = require('express');
const userAssistant = require('../assist/user-assistant');
var router = express.Router();
var userAssist = require("../assist/user-assistant");
var proAssist = require('../assist/product-assistant');
var db = require("../config/db-connection");
const collection = require('../config/collection');


/* GET index page. */
router.get('/',userAssist.varifyLoggedIn,(req, res, next)=> {
      proAssist.getWebData().then((data)=>{
        let user = req.session.user;
        console.log(data)
        res.render('user/user-home', {data,user})
      })
});

//signup functions
router.get('/signup',userAssist.varifyLoggedOut,(req,res)=>{
  res.render('user/signup')
})
router.post("/signup", (req,res)=>{
  userAssist.userSignup(req.body).then((response)=>{
    console.log(response);
    req.session.loggedIn=true
    req.session.user = response
    user = req.session.user
    res.redirect('/')
  })
})

//Login functions
router.get('/login',userAssist.varifyLoggedOut, (req,res)=>{
  res.render("user/login")
})

router.post("/login", (req,res)=>{
  userAssist.userLogin(req.body).then((response)=>{

        if(response.status){
          console.log(response.status)
          req.session.loggedIn = true
          req.session.user = response.user
          user = req.session.user
          res.redirect('/')
        }else{
          req.session.logginErr="invalid username or password"
          console.log("login Error")
          res.redirect('/login')
      }
  })
})
module.exports = router;