import mongoose from "mongoose";
import { ADMIN, MERCHANT, USER } from "../constants/roles.js";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "username is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

                return emailRegex.test(value);

            },
            message: "Invalid email format."
        },
    },
    password: {
        type: String,
        minLength: [8, "Increase the password length"],

    },
    roles: {
        type: [String],
        default: [USER],
        enum: [USER, ADMIN, MERCHANT],

    },
    address: {
        city: {
            type: String,
            required: [true, "User city is required"],
        },
        country: {
            type: String,
            default: "Nepal",
        },
        province: {
            type: String,
            required: [true, "User state is required"],
        },
        street: {
            type: String,
        }
    },
    phone: {
        type: String,
        required: [true, "Please Enter the phone number"],
        unique: [true, "Phone Number should be unique"],
    },
    profileImageUrl: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,


    },
});



const model = mongoose.model("User", userSchema)


export default model;