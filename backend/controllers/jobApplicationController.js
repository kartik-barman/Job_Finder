import { sendApplicationEmail } from "../mailSender/sendApplicationEmail.js";
import JobApplication from "../models/applicationModel.js";

export const applyJobApi = async (req, res) => {
  const {
    jobTitle,
    company,
    applicantId,
    jobId,
    email,
    applicantName,
    fatherMotherName,
    phone,
    collegeName,
    degree,
    address,
  } = req.body;

  // Get the resume file info
  // const resume = req.file; // Multer adds the file to req.file

  // Check if the resume was uploaded
  // if (!resume) {
  //   return res.status(400).json({
  //     success: false,
  //     msg: "Resume is required!",
  //   });
  // }

  try {
    // Check if the email has already been used for this job
    const existEmail = await JobApplication.findOne({ email, jobId });
    if (existEmail) {
      return res.status(400).json({
        success: false,
        msg: "You have already applied for this job!",
      });
    }

    // Create a new job application
    const newApplication = new JobApplication({
      jobTitle,
      company,
      applicantId,
      applicantName,
      fatherMotherName,
      email,
      phone,
      collegeName,
      degree,
      address,
      // resume: resume.path, // Store the file path in the application
      jobId,
      applicationStatus: "applied", // Initial status for the application
    });

    const saveApplication = await newApplication.save();

    await sendApplicationEmail(email, applicantName, jobTitle, company)

    res.status(201).json({
      success: true,
      msg: "Successfully applied for the job",
      application: saveApplication,
    });
  } catch (error) {
    console.error("Errors:", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error!",
    });
  }
};


export const getApplicantApi = async (req, res) => {
  const { jobId } = req.params; 
  try {
    const allCandidates = await JobApplication.find({ jobId });

    const totalApplications = await JobApplication.countDocuments({ jobId });

    if (allCandidates.length === 0) {
      return res.status(404).json({
        message: "No candidates found for the specified job.",
        totalApplications: totalApplications 
      });
    }

    res.status(200).json({
      msg: "Get all candidates.",
      candidates: allCandidates,
      totalApplications: totalApplications 
    });
  } catch (error) {
    console.error("Errors: ", error);
    res.status(500).json({ message: "Internal server error." }); 
  }
};


// Get Appllication Details by UserId

export const userGetApplicationApi = async (req, res) => {
  const { applicantId } = req.params;

  try {
    // Find the job application for the given userId
    const Aplications = await JobApplication.find({applicantId });

    if (!Aplications || Aplications.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No application found!",
      });
    }

   
    res.status(200).json({
      success: true,
      msg: "Application found",
      application: Aplications, 
    });
  } catch (error) {
    console.error("Error fetching application: ", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error", 
      error: error.message, 
    });
  }
};
