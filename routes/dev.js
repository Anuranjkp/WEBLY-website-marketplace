const { response } = require('express');
var express = require('express');
var devAssist = require("../assist/dev-assistant")
var router = express.Router();
var proAssist = require("../assist/product-assistant");
var db = require("../config/db-connection")
var objectId = require("mongodb").ObjectID



/* GET users listing. */
router.get('/',devAssist.varifyLoggedIn, (req, res, next)=> {
  return new Promise(async(resolve,reject)=>{
    let webData = await db.get().collection(process.env.WEBSITES).find().toArray()

    console.log(webData)
      res.render('developer/dev-home', {developer,webData,layout: 'dev-layout'})

  }) 
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
  console.log(req.body)
  devAssist.devSignup(req.body).then((response) => {

    







    if (response.loginFailed){
      console.log(response.loginFailed)
      console.log("login failed 310")
      res.redirect("/dev");
    }
    if(response){
    console.log(response);
    req.session.loggedIn = true
    req.session.user = response
    developer = req.session.user
    console.log("welcome to webly")
    res.redirect("/dev")
    }  
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
router.get("/delete-project/",(req,res)=>{
    let webId=req.query.id;
    console.log(webId)
    proAssist.deleteWebsite(webId).then((response)=>{
      res.redirect("/dev")
    })
})
router.get("/edit-project/",(req,res)=>{
  return new Promise(async(resolve,reject)=>{
    let formCss = true
    let dataId = req.query.id
    let editData = await db.get().collection(process.env.WEBSITES).findOne(objectId(dataId));
    console.log(editData)
    res.render('developer/edit-projects',{formCss,editData,layout:'dev-layout'})
  })

})
router.post("/edit-project/:id",(req,res)=>{
  let id = req.params.id;
  console.log(id)
  proAssist.updateWebsite(id,req.body).then(()=>{
    res.redirect('/dev')
    if(req.files.thumbnail){
      let image = req.files.thumbnail
      image.mv('./public/web-thumbnails/'+id+'.png')
    }

  });

})
module.exports = router;