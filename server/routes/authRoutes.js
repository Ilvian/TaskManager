const express = require('express');
const router = express.Router();
const auth = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

router.post('/register', auth.registerUser);
router.post('/login', auth.loginUser);
router.get("/auth", verifyToken, auth.authenticated)
router.post('/logout', auth.logout);


module.exports = router;
