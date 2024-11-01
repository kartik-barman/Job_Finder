import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 

    },
    mobile : {
        type : String,
        required : true
    },
    password: { 
        type: String, 
        required: true 

    },
    role: { 
        type: String, 
        enum: ['admin','employer', 'candidate'], 
        required: true 

    },
  },{
    timestamps : true
  });


  export const User = mongoose.model('User', userSchema);
