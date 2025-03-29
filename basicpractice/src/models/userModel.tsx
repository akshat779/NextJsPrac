import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide a username'],
        unique  : true
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
    },
    email:{
        type:String,
        required:[true,'Please provide a email'],
        unique : true
    },
    firstName:{
        type:String,
        required:[true,'Please provide a first name'],
    },
    lastName:{
        type:String,
        required:[true,'Please provide a last name'],
    },

    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String, 
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
    
})


const User  = mongoose.models.users || mongoose.model('users',userSchema);

export default User;