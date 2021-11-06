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
    },
    getConfirmOrderData:(webId)=>{
        return new Promise(async(resolve,reject)=>{
            let websiteData;
            let developerData;
            let userData;

            websiteData = await db.get().collection(process.env.WEBSITES).findOne({_id:objectId("616d27d30b4d8c2aa505b9c2")});
            developerData = await db.get().collection(process.env.DEV_COLLECTION).findOne({_id:objectId("616d27310b4d8c2aa505b9c1")});
            userData = await db.get().collection(process.env.USER_COLLECTION).findOne({_id:objectId("616d26d00b4d8c2aa505b9c0")})

            resolve([websiteData,developerData,userData]);
        })
    }
}
