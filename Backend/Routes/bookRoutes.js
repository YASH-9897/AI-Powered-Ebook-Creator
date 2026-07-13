const express =require('express');
const router = express.Router();
const{
    createBook , 
    GetBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCover,
} = require("../controllers/bookcontroller");
const {protect} = require("../middleware/authmiddleware");
const upload= require("../middleware/uploadmiddleware");

//Applying protect middleware to all rutes in this file

router.use(protect);

router.route("/").post(createBook).get(GetBooks);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/cover/:id").put(upload,updateBookCover);

module.exports= router;