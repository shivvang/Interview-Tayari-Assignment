import express from "express";
const submissionRouter = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import { createSubmission, deleteSubmission, getAllSubmissions, getSubmission, updateSubmission } from "../controller/submission.controller.js";

submissionRouter.post("/", authMiddleware,createSubmission);
submissionRouter.get("/", getAllSubmissions); 
submissionRouter.get("/:id", getSubmission); 
submissionRouter.patch("/:id",authMiddleware, updateSubmission); 
submissionRouter.delete("/:id", authMiddleware,deleteSubmission); 

export default submissionRouter;