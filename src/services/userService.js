import { ADMIN, MERCHANT, USER } from "../constants/roles.js";
import uploadFile from "../utils/file.js";
import User from "../models/User.js";

const createUser = async(data) => await User.create(data);


const getUsers = async() => {
    const users = await User.find();
    return users;
};
const getUserById = async(id) => {
    const user = await User.findById(id);

    if (!user)
        throw {
            statusCode: 404,
            message: "user Not found"
        };
    return user;
};
const updateUser = async(id, data, authUser) => {
    const user = await getUserById(id);
    if (user._id != authUser._id && !authUser.roles.includes(ADMIN)) {
        throw {
            statusCode: 403,
            message: "Access denied.",
        };
    }
    const UpdatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return UpdatedUser;
};
const deleteUser = async(id) => {
    const deleteUser = await User.findByIdAndDelete(id);
    return deleteUser;
};
const updateProfileImage = async(id, file, authUser) => {
    // Check if user exists
    const user = await getUserById(id);
    if (!user) {
        throw {
            statusCode: 404,
            message: "User not found.",
        };
    }

    // Use .toString() to safely compare ObjectIds
    if (user._id.toString() !== authUser._id.toString() && !authUser.roles.includes("ADMIN")) {
        throw {
            statusCode: 403,
            message: "Access denied.",
        };
    }

    const uploadedFiles = await uploadFile([file]);

    // Manually check for uploaded file and URL
    if (!uploadedFiles || uploadedFiles.length === 0 || !uploadedFiles[0] || !uploadedFiles[0].url) {
        throw {
            statusCode: 400,
            message: "File upload failed.",
        };
    }

    // Update user profile image

    const updateUser = async(id, data, authUser) => {
        const user = await getUserById(id);

        if (user._id != authUser._id && !authUser.roles.includes(ADMIN)) {
            throw {
                statusCode: 403,
                message: "Access denied.",
            };
        }

        const updatedUser = await User.findByIdAndUpdate(
            id, {
                name: data.name,
                phone: data.phone,
                address: data.address,
            }, { new: true }
        );

        return updatedUser;
    };


};
const createMerchant = async(userId) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId, {
            roles: [USER, MERCHANT],
        }, { new: true }
    );

    return updatedUser;
};



export default { createUser, getUsers, getUserById, updateUser, deleteUser, updateProfileImage, createMerchant };