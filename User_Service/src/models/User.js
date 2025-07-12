import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"]
    },
    hintUsage: {
        count: { type: Number, default: 0 },
        lastUsed: { type: String }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        default: null
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpires: {
        type: Date,
        default: null
    }
}, {timestamps: true});

// Hash password before storing in db
UserSchema.pre("save", async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

//compare password for login 
UserSchema.method.comparePassword = async (userPassword) => {
    return bcrypt.compare(userPassword, this.password);
};

export const User = mongoose.model('User', UserSchema);