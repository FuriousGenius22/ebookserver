import { emailValidationSchema } from "@/middlewares/validate";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'author'],
        default: 'user'
    },

})


const UserModel = model(
    "user",
    userSchema
)

export default UserModel