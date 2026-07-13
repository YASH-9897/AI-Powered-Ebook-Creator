const express = require("express");
const router = express.Router();
const {
    generateOutline,
    generateChapterContent,
} = require("../controllers/aicontroller");

const { protect } = require("../middleware/authmiddleware");

//Apply protect middleware to all routes
router.use(protect);

router.post("/generate-Outline", generateOutline);
router.post("/generate-Chapter-Content", generateChapterContent);

module.exports = router;
