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
        enum:["Admin", "Seller", "Buyer"],
        default:"Buyer",
        required:true
    },
    Address:{
        type:String
    },
    Phone:{
        type:String
    },
    age:{
        type:Number,
        minLength:18
    },
    GovermentId:{
        type:String

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    Profile_photo:{
        type:String
    }
   
},{
    timestamps:true
})



const User=mongoose.model("User", userSchema);

export default User