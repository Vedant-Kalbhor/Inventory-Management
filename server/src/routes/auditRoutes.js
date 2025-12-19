const express = require("express");
const router= express.Router();
const AuditLog = require("../models/AuditLog");
const { authMiddleware }= require("../middlewares/authMiddleware");
const { roleMiddleware }= require("../middlewares/roleMiddleware");

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["Admin"]),
    async(req,res)=>{
        const logs = await AuditLog.find()
            .populate("actor","name role")
            .sort({createdAt: -1})
            .limit(200);
        res.json(logs);
    });
module.exports = router;

