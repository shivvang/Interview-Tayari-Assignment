import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true,
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
questions:[
    {
        type:String,
        required:true,
    }
]
},{timestamps:true});



const Submission  = mongoose.model("Submission",submissionSchema);

export default Submission;