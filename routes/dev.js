const { response } = require('express');
var express = require('express');
var devAssist = require("../assist/dev-assistant")
var router = express.Router();
var proAssist = require("../assist/product-assistant");



/* GET users listing. */
router.get('/',devAssist.varifyLoggedIn, (req, res, next)=> {
  console.log("rendering developer panel")
  let websites = [
    {
      title:'Python Personal Website',
      description:'This is a persanl website built with python, it have bot chatting and great UI.',
      category:"personal website",
      image:'https://thumbs.dreamstime.com/z/python-programming-code-technology-banner-language-software-coding-development-website-design-136018975.jpg'
    },
    {
      title:'nodejs business Website',
      description:'This is a persanl website built with node, it have auto email and amazing UI.',
      category:"business website",
      image:'https://www.courses.tutorialswebsite.com/assets/front/img/category/Nodejs-banner.jpeg'
    },
    {
      title:'Php ecommerce Website',
      description:'This is a persanl website built with pho technology, .',
      category:"ecommerce website",
      image:'https://previews.123rf.com/images/varijanta/varijanta1605/varijanta160500044/56755965-thin-line-flat-design-banner-for-sale-web-page-shopping-e-commerce-discounts-and-clearance-sale-mode.jpg'
    },
    {
      title:'Python Personal Website',
      description:'This is a persanl website built with python, it have bot chatting and great UI.',
      category:"personal website",
      image:'https://thumbs.dreamstime.com/z/python-programming-code-technology-banner-language-software-coding-development-website-design-136018975.jpg'
    },
    {
      title:'nodejs business Website',
      description:'This is a persanl website built with node, it have auto email and amazing UI.',
      category:"business website",
      image:'https://www.courses.tutorialswebsite.com/assets/front/img/category/Nodejs-banner.jpeg'
    },
    {
      title:'Php ecommerce Website',
      description:'This is a persanl website built with pho technology, .',
      category:"ecommerce website",
      image:'https://previews.123rf.com/images/varijanta/varijanta1605/varijanta160500044/56755965-thin-line-flat-design-banner-for-sale-web-page-shopping-e-commerce-discounts-and-clearance-sale-mode.jpg'
    }
  ]
  res.render('developer/dev-home', {developer,websites,layout: 'dev-layout'})
});

//Rendering developer signup page
router.get('/devsignup', (req, res) => {
  console.log("rendering Signup page")
  let formCss = true;
  res.render("developer/dev-signup", {formCss, layout: 'dev-layout' });
  console.log("dev Signup page")
})

//Developer submit signup form
router.post("/devsignup", (req, res) => {
  devAssist.devSignup(req.body).then((response) => {
    console.log(response);
    req.session.loggedIn = true
    req.session.user = response
    developer = req.session.user
    console.log("welcome to webly")
    res.redirect("/dev")
  })
})

//Rendering developer Login page 
router.get('/devlogin', (req, res) => {
  let formCss = true;
  res.render("developer/dev-login", {formCss,layout: 'dev-layout' })
})

//Developer submit login form
router.post('/devlogin', (req, res) => {
  devAssist.devLogin(req.body).then((loginResponse) => {
    if (loginResponse.status) {
      // login true
      req.session.user = loginResponse.developer 
      req.session.user.loggedIn = true
      developer = req.session.user
      res.redirect('/dev')
    } else {
      //login false
      req.session.logginErr = "invalid username or password"
      console.log("login Error")
      res.redirect('/login')
    }
  })
})
//adding projects
router.get('/addProjects',(req,res)=>{
  let formCss = true
  res.render('developer/add-projects',{formCss,layout:'dev-layout'});  
})
router.post('/addProjects',(req,res)=>{
  proAssist.addWebsite(req.body).then((id)=>{
    //uploading files
    let thumbnail = req.files.thumbnail;
    let website = req.files.website;
    //uploading thumbanil image
    thumbnail.mv("./public/web-thumbnails/"+id+".png",(err)=>{
      if(err) {
        console.log(err)
      }else{
        console.log("thumbnail image uploaded to server");
      }
    })
    //uploading website zip
    website.mv("./public/websites/"+id+".zip",(err)=>{
      if(err){
        console.log(err)
      }else{
        console.log("website uploaded to server successfuly")
      }
    })
    res.redirect('/dev/addProjects')
  })
})
module.exports = router;