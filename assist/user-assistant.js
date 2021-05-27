const db = require("../config/db-connection")
const objectId = require("mongodb").ObjectID
const collection = require("../config/collection")
const bcrypt = require("bcrypt")

module.exports = {
 userSignup: (userSignupData) =>{
     return new Promise(async (resolve,reject)=>{
         let PasswordHashed = userSignupData.Passwd.toString()
         userSignupData.Passwd = await bcrypt.hash(PasswordHashed, 10)
         db.get().collection(process.env.USER_COLLECTION).insertOne(userSignupData).then((data)=>{
             resolve(data.ops[0])
         })
     })
 },
 userLogin: (userLoginData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false;
            let response = {}
            let user = await db.get().collection(process.env.USER_COLLECTION).findOne({Email: userLoginData.Email})

            
            if(user){
                bcrypt.compare(userLoginData.Password, user.Passwd).then((status)=>{
                    
                    if(status){
                        console.log("Login Successful");
                        response.status = true
                        response.user = user
                        resolve(response)
                    }else{
                        console.log("login failed(1)")
                        resolve({status:false})
                    }
                })
            }else{
                response.status = false
                console.log("Login Failed(2)")
                
            }
        })
 }
 
}