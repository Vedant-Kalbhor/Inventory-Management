const AuditLog = require("../models/AuditLog")

async function logAudit({actor,action,entity,entityId,meta}) {
    try{
        await AuditLog.create({
            actor,
            action,
            entity,
            entityId,
            meta
        });
    }catch(err){
        console.error('Audit log failed',err.message);
    }
}

module.exports={logAudit};