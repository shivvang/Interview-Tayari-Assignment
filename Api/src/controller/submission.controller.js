import Submission from "../models/submission.model.js";

export const createSubmission = async (req, res) => {
    try {
      const { name, questions } = req.body;
      const user = req.user;
  
      
      if (!name || typeof name !== "string") {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid or missing 'name'. It must be a non-empty string." 
        });
      }
  
      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: "'questions' must be a non-empty array." 
        });
      }
  
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: "Unauthorized. User information is missing or invalid." 
        });
      }
  
    
      const newSubmission = await new Submission({
        name,
        questions,
        user,
      }).save();
  
      return res.status(201).json({
        success: true,
        message: "Submission created successfully.",
        data: newSubmission,
      });
  
    } catch (error) {
      console.error(`Error creating submission: ${error.message}`);
      return res.status(500).json({ 
        success: false, 
        message: "Server error while creating submission." 
      });
    }
  };

  export const getAllSubmissions = async (req, res) => {
    try {
      let { start } = req.query;
      start = parseInt(start, 10);
  
      if (isNaN(start) || start < 1) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid 'start' parameter. It must be a positive integer." 
        });
      }
  
      const nextSet = (start - 1) * 10;
  
      
      const allSubmissions = await Submission.find({})
        .skip(nextSet)
        .limit(10);
  
      
      if (!allSubmissions || allSubmissions.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "No submissions found for the given page." 
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Submissions fetched successfully.",
        data: allSubmissions,
      });
    } catch (error) {
      console.error(`Error while fetching submissions: ${error.message}`);
      return res.status(500).json({ 
        success: false, 
        message: "Server error while fetching submissions." 
      });
    }
  };
  

  export const getSubmission = async (req, res) => {
    try {
      const { id } = req.params;
  
     
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: "Submission ID is required." 
        });
      }
  
    
      const submission = await Submission.findById(id);
  
    
      if (!submission) {
        return res.status(404).json({ 
          success: false, 
          message: "Submission not found." 
        });
      }
  
      
      return res.status(200).json({
        success: true,
        message: "Submission fetched successfully.",
        data: submission,
      });
  
    } catch (error) {
      console.error(`Error while fetching submission: ${error.message}`);
      return res.status(500).json({ 
        success: false, 
        message: "Server error while fetching submission." 
      });
    }
  };
  

  export const updateSubmission = async (req, res) => {
    try {
      const { id } = req.params;
      const { questions } = req.body;
  
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: "Submission ID is required." 
        });
      }
  
    
      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: "'questions' must be a non-empty array." 
        });
      }
  
    
      const updatedSubmission = await Submission.findByIdAndUpdate(
        id, 
        { questions },
        { new: true } 
      );
  
      
      if (!updatedSubmission) {
        return res.status(404).json({ 
          success: false, 
          message: "Submission not found." 
        });
      }
  
      
      return res.status(200).json({
        success: true,
        message: "Submission updated successfully.",
        data: updatedSubmission,
      });
  
    } catch (error) {
      console.error(`Error while updating submission: ${error.message}`);
      return res.status(500).json({ 
        success: false, 
        message: "Server error while updating submission." 
      });
    }
  };
  
  export const deleteSubmission = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate the ID
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: "Submission ID is required." 
        });
      }
  
      // Find and delete the submission
      const deletedSubmission = await Submission.findByIdAndDelete(id);
  
      // Check if the submission exists
      if (!deletedSubmission) {
        return res.status(404).json({ 
          success: false, 
          message: "Submission not found." 
        });
      }
  
      // Return success response
      return res.status(200).json({
        success: true,
        message: "Submission deleted successfully.",
      });
  
    } catch (error) {
      console.error(`Error while deleting submission: ${error.message}`);
      return res.status(500).json({ 
        success: false, 
        message: "Server error while deleting submission." 
      });
    }
  };
  