import mongoose from "mongoose";
import {
    PAYMENT_STATUS_COMPLETED,
    PAYMENT_STATUS_FAILED,
    PAYMENT_STATUS_PENDING,
} from "../constants/paymentStatuses.js";
const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Amount is required "],
    },
    method: {
        type: String,
        required: [true, "Payment Method is required."],
        enum: ["cash", "card", "Online"],
        status: {
            type: String,
            default: PAYMENT_STATUS_PENDING,
            enum: [
                PAYMENT_STATUS_COMPLETED,
                PAYMENT_STATUS_FAILED,
                PAYMENT_STATUS_PENDING
            ],
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
    transactionId: String,
});

const model = mongoose.model("payment", paymentSchema);
export default model;