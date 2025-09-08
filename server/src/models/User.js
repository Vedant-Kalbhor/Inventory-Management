const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true,trim:true},
    email:{type:String,required:true,unique:true,lowecase:true},
    passwordHash:{type:String,required:true},
    role:{type:String,enum:['Admin','Manager','Employee','Supplier'],default:'Employee'},
    isActive:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now},
});

UserSchema.virtual('password')
    .set(function (password){
        this._password = password;
        this.passwordHash = bcrypt.hashSync(password,10);
    })
    .get(function(){return this._password;});

UserSchema.methods.comparePassword = function(candidate){
    return bcrypt.compareSync(candidate,this.passwordHash);
}

module.exports =mongoose.model('User',UserSchema);