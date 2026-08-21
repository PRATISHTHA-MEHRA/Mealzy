

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userModel from '../modals/userModal.js';

dotenv.config();

const email = process.argv[2];

if (!email) {
    console.error('Usage: node scripts/makeAdmin.js someone@example.com');
    process.exit(1);
}

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await userModel.findOne({ email });
    if (!user) {
        console.error(`No user found with email: ${email}`);
        process.exit(1);
    }

    user.role = 'admin';
    await user.save();

    console.log(`${email} is now an admin.`);
    process.exit(0);
};

run().catch(err => {
    console.error(err);
    process.exit(1);
});