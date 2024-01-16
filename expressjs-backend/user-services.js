import mongoose from "mongoose";
import userModel from "./user.js";

// uncomment the following line to view mongoose debug messages
// mongoose.set("debug", true);

mongoose
    .connect("mongodb://127.0.0.1:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

async function getUsers(name, contact) {
    let result;
    if (name === undefined && contact === undefined) {
        result = await userModel.find();
    } else if (name && !job) {
        result = await findUserByName(name);
    } else if (job && !name) {
        result = await findUserByContact(contact);
    }
    return result;
}

async function addUser(user) {
    try {
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save();
        return savedUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function findUserByName(name) {
    return await userModel.find({ name: name });
}

async function findUserByContact(contact) {
    return await userModel.find({ contact: contact });
}

export default {
    addUser,
    getUsers,
    findUserByName,
    findUserByContact,
};
