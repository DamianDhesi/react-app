import mongoose from "mongoose";
import userModel from "./user.js";
import "dotenv/config";

// uncomment the following line to view mongoose debug messages
// mongoose.set("debug", true);

mongoose
    .connect(`mongodb+srv://damiandhesi:${process.env.PASSWORD}@cluster0.pnj1u8q.mongodb.net/?retryWrites=true&w=majority`)
    .catch((error) => console.log(error));

async function getUsers(name, password) {
    let result;
    if (name === undefined && password === undefined) {
        result = await userModel.find().select("name").exec();
    } else if (name && !password) {
        result = await findUserByName(name);
    } else if (password && !name) {
        result = await findUserByPassword(password);
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
    return await userModel.find({ name: name }).select("password").exec();
}

async function findUserByPassword(password) {
    return await userModel.find({ password: password }).select("name").exec();
}

async function verifyUser(name, password) {
    const existingUser = await userModel.findOne({name: name, password: password}).select("name").exec();
    
    if (existingUser == null) {
        return null;
    }

    return existingUser.name;
}

export default {
    addUser,
    getUsers,
    findUserByName,
    findUserByPassword,
    verifyUser,
};
