const db = require("../config/db-connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");
const objectId = require("mongodb").ObjectID;   
const { response } = require("express");
const { NotExtended } = require("http-errors");


module.exports = { 
    
    devSignup: (devSignupData)=>{
    return new Promise(async(resolve,reject)=>{
            let PasswordHash = devSignupData.Passwd.toString()
            devSignupData.Passwd = await bcrypt.hash(PasswordHash, 10)
            db.get().collection(collection.DEV_COLLECTION).insertOne(devSignupData).then((data)=>{
                resolve(data.ops[0])
            })
    })
},
devLogin: (devLoginData)=>{
 return new Promise(async(resolve,reject)=>{
     let devLoginStatus = false;
     let loginResponse = {}
     let developer = await db.get.collection(collection.DEV_COLLECTION).findOne({Email: devLoginData.Email});
     if (developer){
         bcrypt.compare(userLoginData.Passwd, developer.Passwd).then((status)=>{
             if(status){
                console.log("Login Successful");
                response.status = true
                response.user = user
                resolve(response)
             }else {
                 console.log("login failed(1)")

             }
         })
        }
        })
    },


}