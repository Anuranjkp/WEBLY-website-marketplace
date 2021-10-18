const { resolve } = require("promise")
const db = require("../config/db-connection")
const objectId=require('mongodb').ObjectID

module.exports = {
    addWebsite:(webDetails) => {
        return new Promise(async (resolve,reject)=>{
            db.get().collection(process.env.WEBSITES).insertOne(webDetails).then((data)=>{
                resolve(data.ops[0]._id)
            })
        })
    },
    getWebData:()=>{
        return new Promise(async(resolve,reject)=>{
            let data = db.get().collection(process.env.WEBSITES).find().toArray();
            resolve(data)
        })
    },
    deleteWebsite:(webId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(process.env.WEBSITES).removeOne({_id:objectId(webId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
    },
    updateWebsite:(webId,updateData)=>{
        return new Promise((resolve,reject)=>{
            console.log(webId)
            console.log(updateData)
            db.get().collection(process.env.WEBSITES).updateOne({_id:objectId(webId)},{
                $set:{
                    projectName:updateData.projectName,
                    programmingLanguage:updateData.programmingLanguage,
                    pages:updateData.pages,
                    websitePrice:updateData.websitePrice
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    getWebDataById:(webId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(process.env.WEBSITES).findOne({_id:objectId(webId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}
