const express =require("express");
const router = express.Router();
const {exportAsPDF , exportAsDocument} = require("../controllers/exportcontroller");
const {protect} = require("../middleware/authmiddleware");

router.get("/:id/pdf" , protect, exportAsPDF);
router.get("/:id/doc" , protect, exportAsDocument);

module.exports=router;