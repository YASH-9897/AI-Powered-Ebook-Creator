//This is a standard backend setup used in MERN applications for APIs, MongoDB connectivity, and serving uploaded files such as profile pictures or documents.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");

const authRoutes = require("./Routes/authRoutes");
const bookRoutes = require("./Routes/bookRoutes");
const aiRoutes = require("./Routes/aiRoutes");
const exportRoutes = require("./Routes/exportRoutes");

const app = express();

//middleware for handling cors
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "ai-powered-ebook-creator-c8fu.vercel.app"
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })

);

//Connect Database
connectDB();

//middleware
app.use(express.json());

//static folder for uploads
app.use("/backend/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/", (req, res) => {
    res.send("API is running...");
});

//Routes Here
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes);


//start server

const PORT = Number(process.env.PORT) || 5000; // default safe port



const server = app.listen(PORT, () => {
    const addr = server.address();

});

server.on('error', (err) => {
    console.error('Server failed to start:', err);
    process.exit(1);
});


