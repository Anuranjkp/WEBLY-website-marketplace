const { resolve } = require("promise")
const db = require("../config/db-connection")

module.exports = {
    addWebsite:(webDetails) => {
        return new Promise(async (resolve,reject)=>{
            db.get().collection(process.env.WEBSITES).insertOne(webDetails).then((data)=>{
                resolve(data.ops[0]._id)
            })
        })
    }
}
