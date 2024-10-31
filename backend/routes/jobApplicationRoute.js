import express from "express";
import {
  applyJobApi,
  getApplicantApi,
  userGetApplicationApi,
} from "../controllers/jobApplicationController.js";
import { uploadResume } from "../multer/multerConfig.js";
const JobApplicationRouter = express.Router();

// http:localhost:5000/api/job/application/post/job
JobApplicationRouter.post("/post-job",  applyJobApi);

// http://localhost:5000/api/job/application/all-candidate/
JobApplicationRouter.get("/:jobId/candidates", getApplicantApi);

// http://localhost:5000/api/job/application/candidate/application/672341e349b0096a727a83dc
JobApplicationRouter.get("/candidate/application/:applicantId", userGetApplicationApi)

export default JobApplicationRouter;
