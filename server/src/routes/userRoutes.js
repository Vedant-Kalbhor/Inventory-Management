const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/userController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// All routes below require authentication
router.use(protect);

// Admin-only routes
router.get("/", authorize("Admin"), userCtrl.listUsers);
router.post("/", authorize("Admin"), userCtrl.createUser);
router.get("/:id", authorize("Admin"), userCtrl.getUser);
router.put("/:id", authorize("Admin"), userCtrl.updateUser);
router.delete("/:id", authorize("Admin"), userCtrl.deleteUser);

module.exports = router;
