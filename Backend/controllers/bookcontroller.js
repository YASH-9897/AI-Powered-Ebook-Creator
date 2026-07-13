const Book = require("../models/Book");

//@desc Creat a new Book
//@ROUTE POST/api/books
//@acess private

const createBook = async (req, res) => {
    try {
        const { title, Author, Subtitle, chapters } = req.body;

        if (!title || !Author) {
            return res.status(400).json({ message: "Please provide a title and author " });
        }

        const book = await Book.create({
            userId: req.User._id,
            title,
            Author,
            Subtitle,
            chapters,
        });

        res.status(201).json(book);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

//@desc Get all books for a user
//@ROUTE GET/api/books/:id
//@acess private

const GetBooks = async (req, res) => {
    try {
        const books = await Book.find({ userId: req.User._id }).sort({ createdAt: -1 });
        res.status(200).json(books);
    }
    catch (error) {

        res.status(500).json({ message: "Server Error" });
    }

};

//@desc Get a single Book By id 
//@ROUTE GET/api/books/:id
//@acess private

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({ message: "Book not found" });
        }

        if (book.userId.toString() !== req.User._id.toString()) {
            return res.status(401).json({ message: "Not authorized to view this book" })
        }

        res.status(200).json(book);

    }
    catch (error) {
        console.log(error)

        res.status(500).json({ message: "Server Error" });
    }

};

//@desc Update a  Book
//@ROUTE PUT/api/book/:id
//@acess private


const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({ message: "Book not found" });
        }

        if (book.userId.toString() !== req.User._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book" })
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
        });

        res.status(200).json(updatedBook);

    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

};


//@desc Delete a  Book
//@ROUTE Delete/api/book/:id
//@acess private

const deleteBook = async (req, res) => {
    try {

      

        const book = await Book.findById(req.params.id);

        

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.userId.toString() !== req.User._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this book" });
        }

        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (error) {
        console.log(error);

        res.status(500).json({ message: "Server Error" });
    }

};


//@desc Update a  Book's cover image 
//@ROUTE Update/api/book/cover/:id
//@acess private

const updateBookCover = async (req, res) => {
    try {
           const book = await Book.findById(req.params.id);

        

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.userId.toString() !== req.User._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book's cover " });
        }

        if(req.file){
            book.coverImage= `/${req.file.path}`;
        } else{
            return res.status(400).json({message:"No image file provided"});
        }
        const updatedBook = await book.save();
        
        res.status(200).json(updatedBook);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

};

module.exports = {
    createBook,
    GetBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCover,
};


