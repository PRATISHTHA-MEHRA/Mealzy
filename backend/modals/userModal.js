import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    }
)

const UserModel = mongoose.model.user || mongoose.model('user', userSchema)

export default UserModel;