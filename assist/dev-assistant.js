const db = require("../config/db-connection");
const bcrypt = require("bcrypt");
const objectId = require("mongodb").ObjectID;
const { response } = require("express");
const { NotExtended } = require("http-errors");


module.exports = {
    varifyLoggedIn: (req,res,next) =>{
        if(req.session.user){
          next()
        }else {
          res.redirect('/dev/devlogin')
        }
      },

    devSignup: (devSignupData) => {
        return new Promise(async (resolve, reject) => {
            let PasswordHash = devSignupData.passwd.toString()
            devSignupData.passwd = await bcrypt.hash(PasswordHash, 10)
            console.log("password hashed")
            bcrypt.compare(devSignupData.confirmPasswd, devSignupData.passwd).then((data)=>{
            
                if(data){
            delete devSignupData.confirmPasswd
            console.log("confirm passwoed deleted")
            console.log(devSignupData)
            db.get().collection(process.env.DEV_COLLECTION).insertOne(devSignupData).then((data) => {
                console.log("data added to database")
                resolve(data.ops[0])
            })
            }else{
                console.log("password not matched....thank you")
                let signupFailed = true
                resolve(signupFailed)
            }

            })
            

        })
    },

    devLogin: (devLoginData) => {
        return new Promise(async (resolve, reject) => {
            let devLoginStatus = false;
            let loginResponse = {}
            let developer = await db.get().collection(process.env.DEV_COLLECTION).findOne({ Email: devLoginData.Email });
            if (developer) {
                console.log("email is correct camparing password....")
                console.log(devLoginData.passwd)
                console.log(developer.passwd)
                bcrypt.compare(devLoginData.passwd, developer.passwd).then((status) => {
                    if (status) {
                        console.log("Login Successful");
                        loginResponse.status = true
                        loginResponse.developer = developer
                        resolve(loginResponse)
                    } else {
                        console.log("login failed(1)")

                    }
                })
            }
        })
    }

}