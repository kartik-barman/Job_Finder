import express from "express";
import {
  createJobApi,
  deleteJobApi,
  editJobApi,
  getAllJobsApi,
  getJobByIdApi,
  getJobByUserId,
  searchJobsApi,
} from "../controllers/jobsController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const jobsRouter = express.Router();

jobsRouter.get("/search", searchJobsApi);
jobsRouter.post("/create-job", createJobApi);
jobsRouter.get("/", getAllJobsApi);
jobsRouter.get("/:id", getJobByIdApi);
jobsRouter.put("/edit-job/:id", editJobApi);
jobsRouter.delete("/delete-job/:id", deleteJobApi)

// Employer routes
jobsRouter.get("/get/job/employer/:employerId", getJobByUserId)

export default jobsRouter;
