import mongoose from "mongoose";

const connectToDatabase = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected Successfully!")
    } catch (error) {
       console.log(error, "Error connecting to Database") 
    }
}

export default connectToDatabase