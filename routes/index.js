const { response } = require('express');
var express = require('express');
const userAssistant = require('../assist/user-assistant');
var router = express.Router();
var userAssist = require("../assist/user-assistant")

//Security check for user loggedin 
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')  
  }
}

/* GET index page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('user/user-home', {user})
  }else {
  res.render('user/intro-page', {layout:'intro'});
  }
});

//signup functions
router.get('/signup',(req,res)=>{
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
router.get('/login', (req,res)=>{
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