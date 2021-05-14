const { response } = require('express');
var express = require('express');
const { varifyLoggedIn } = require('../assist/dev-assistant');
var devAssist = require("../assist/dev-assistant")
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a Developer Home Page');
});
router.get('/devsignup', (req,res)=>{
  res.render("developer/dev-signup.hbs")
})
router.post("/devsignup", (req,res)=>{
    devAssist.devSignup(req.body).then((response)=>{
      console.log(response);
      req.session.loggedIn=true
      req.session.user=response
      console.log("Exuba freelancing developer successful")
      res.redirect("/")
    })
})

module.exports = router;
