import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
},{timestamps:true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); // Exit only if the password is not modified
    }
    try {
        this.password = await bcryptjs.hash(this.password, 10); 
        next(); 
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            userId: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}h` } 
    );
};

userSchema.index({email: 1 },{unique:true});


const User = mongoose.model("User",userSchema);

export default User;