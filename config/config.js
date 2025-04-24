import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/student-management")
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err)
        process.exit(1)
    })

