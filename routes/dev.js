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
  
})
module.exports = router;
