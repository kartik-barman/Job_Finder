import express from "express";
import {
  applyJobApi,
  getApplicantApi,
} from "../controllers/jobApplicationController.js";
import { uploadResume } from "../multer/multerConfig.js";
const JobApplicationRouter = express.Router();

// http:localhost:5000/api/job/application/post/job
JobApplicationRouter.post("/post-job", uploadResume, applyJobApi);

// http://localhost:5000/api/job/application/all-candidate/
JobApplicationRouter.get("/:jobId/candidates", getApplicantApi);

export default JobApplicationRouter;
