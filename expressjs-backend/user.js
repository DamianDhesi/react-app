import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        contact: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                var specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                if (value === value.toLowerCase() && !/\d/.test(password) && !specialChars.test(password)) {
                    throw new Error("Invalid password, must have atleast one uppercase letter, atleast one special char, and atleast one number.");
                }
            }
        },
        token: {
            type: String,
            required: true,
            trim: true,
        }
    },
    { collection: "users_list" }
);

export default mongoose.model("User", UserSchema);
