const db = require('mongoose')

const UserSchema = new db.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:Number, required:true},
    password:{type:String, required:true},
    role:{type:String, enum:["listener", "Artist"], Default: "listener"},
    createdAt:{type:Date, default:Date.now}
})

module.exports = db.model('User', UserSchema)


