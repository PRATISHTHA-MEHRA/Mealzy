import mongoose from "mongoose";

export const connectDB= async() => {
    await mongoose.connect('mongodb+srv://pratishtha0303_db_user:mealzy123@cluster0.3qah6nx.mongodb.net/mealzy').then(()=> console.log('DB CONNECTED'))
}