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
        unique:true,
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

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))next();
    this.password = bcryptjs.hash(this.password,10);
    next();
})

userSchema.methods.comparePassword = function(password){
    return  bcryptjs.compare(this.password,password);
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        userId:this._id,
        email:this.email,
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:`{process.env.ACCESS_TOKEN_EXPIRY}h`})
}

userSchema.index({email: 1 },{unique:true});


const User = mongoose.model("User",userSchema);

export default User;