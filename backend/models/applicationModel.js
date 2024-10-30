import mongoose from "mongoose";


const jobApplicationSchema = new mongoose.Schema({
    applicantId : {
        type : String,
        required : true,
    },
    applicationStatus: {
        type: String,
        enum: ['applied', 'submitted', 'pending', 'verified', 'selected', 'rejected'],
        default: 'applied'
    },
    applicantName: {
        type: String,
        required: true,
        trim: true
    },
    fatherMotherName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    degree: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    resume: {
        type: Object, 
        // required: true
    },
    jobId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
