const mongoose = require('mongoose');

const AuditLog=new mongoose.Schema({
    actor:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    action:{type:String,required:True},
    entity:{type:String},
    entityId:{type:String},
    meta:{type:mongoose.Schema.Types.Mixed},
    createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);