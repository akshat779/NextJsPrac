import mongoose from "mongoose";

export const dbConfig = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI!)
        const db =  mongoose.connection;
        db.on('connected',() => {
            console.log('Connected to database')
        })
        db.on('error', (err) => {
            console.log('Error:', err)
        })
    }
    catch(err){
        console.log('Error:', err)
    }
}