import mongoose from 'mongoose'


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['User',"Admin"],
        required:true
    },
    subcriptions:{
        type:mongoose.Schema.ObjectId,
        ref:"Trade"
    }
},{
    timestamps:true
})


const User=mongoose.model("User", userSchema);

export default User