import { request } from "https";
import mongoose from "mongoose";
import { required } from "zod/mini";
export type UserRole = 'User' | 'Admin';
const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        request: true,
        trim: true
    },
    address: {
        type: String,
        request: true,
        trim: true
    },
    state: {
        type: String,
        request: true,
        trim: true
    },
    PostalCode: {
        type: String,
        request: true,
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: false
    })

const UserSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    points: {
        type: Number,
        default: 0,
        min: 0
    },
    addresses: {
        type: [addressSchema],
        default: []
    }
},
    { timestamps: true },
);
export const User = mongoose.models.User || mongoose.model('User', UserSchema)