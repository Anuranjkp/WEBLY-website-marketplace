const { response } = require('express');
var express = require('express');
const { varifyLoggedIn } = require('../assist/dev-assistant');
var devAssist = require("../assist/dev-assistant")
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("developer/dev-home", {layout:'dev-layout'})
});
router.get('/devsignup', (req,res)=>{
  res.render("developer/dev-signup",{layout:'dev-layout'})
})
router.post("/devsignup", (req,res)=>{
    devAssist.devSignup(req.body).then((response)=>{
      console.log(response);
      req.session.loggedIn=true
      req.session.user=response
      console.log("Exuba freelancing developer successful")
      res.redirect("/dev")
    })
})
router.get('/devlogin',(req,res)=>{
    res.render("developer/dev-login", {layout:'dev-layout'})
})
router.post('/devlogin',(req,res)=>{
  devAssist.devLogin(req.body).then((loginResponse)=>{
    
    /* loginResponse is coming from dev-assistant & 
      the object contains true or false status. 
      if the email and passsowrd are correct 
      then it have developer information parameter. 
      Also the user login will be like this*/

    if(loginResponse.status){
      /* login true */
      req.session.loggedIn = true
      req.session.user = loginResponse.user
      user = req.session.user
      res.redirect('/dev')
    }else{
      req.session.logginErr="invalid username or password"
      console.log("login Error")
      res.redirect('/login')
  }
})
})
module.exports = router;
