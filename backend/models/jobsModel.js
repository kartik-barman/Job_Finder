import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  company: { 
    type: String, 
    required: true 

  },
  location: { 
    type: String, 
    required: true 

  },
  description: { 
    type: String, 
    required: true 

  },
  requirements: [String],
  salary: {
    min: Number,
    max: Number,
    currency: { 
        type: String, 
        default: "INR" 
    },
  },
  type: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applications: [
    {
      applicant: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      },
      status: {
        type: String,
        enum: ["pending", "reviewed", "rejected", "accepted"],
        default: "pending",
      },
      appliedAt: { 
        type: Date, 
        default: Date.now 
      },
    },
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 

  },
},{
    timestamps : true,
});

const Jobs = mongoose.model('jobs_list', jobSchema);

export default Jobs;