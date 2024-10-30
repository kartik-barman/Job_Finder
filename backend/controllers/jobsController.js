import Jobs from "../models/jobsModel.js"; // import Jobs model

/**____________________________________________________________________*
 *                                                                     *
 *                      function to create a job                       *
 *              http://localhost:5000/api/jobs/create-job              *
 *                                                                     *
 *_____________________________________________________________________*/

export const createJobApi = async (req, res) => {
  try {
    if (!req.body.title || !req.body.company || !req.body.description) {
      return res.status(400).json({
        success: false,
        msg: "Please provide all required fields (title, company, description).",
      });
    }
    const newJob = await Jobs({
      ...req.body,
    });
    const saveJob = await newJob.save();
    res.status(201).json({
      success: true,
      msg: "Job Created Successfully..",
      job: saveJob,
    });
  } catch (error) {
    console.error("Errors: ", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error!",
    });
  }
};

/**____________________________________________________________________*
 *                                                                     *
 *                      function to get all jobs                       *
 *                   http://localhost:5000/api/jobs/                   *
 *                                                                     *
 *_____________________________________________________________________*/

export const getAllJobsApi = async (req, res) => {
  try {
    const jobs = await Jobs.find();
    const total = await Jobs.countDocuments();
    res.status(200).json({
      success: true,
      msg: "Successfully fetched all jobs...",
      jobs,
      total,
    });
  } catch (error) {
    console.error("Errors: ", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error!",
    });
  }
};

/**_______________________________________________________________________________________________________*
 *                                                                                                        *
 *                                  function to search specific job                                       *
 *                               http://localhost:5000/api/jobs/search                                    *
 *               http://localhost:5000/api/jobs/search?keyword=developer&location=remote&type=contract    *
 *                                                                                                        *
 *________________________________________________________________________________________________________*/

export const searchJobsApi = async (req, res) => {
  try {
    const { keyword, location, type } = req.query;

    // Create a query object
    const query = {};

    // Filter by keyword in the title and description
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    const jobs = await Jobs.find(query);
    const total = await Jobs.countDocuments(query);

    // Check if no jobs are found
    if (total === 0) {
      return res.status(404).json({
        success: false,
        msg: "No jobs available for the given search criteria.",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Successfully fetched jobs based on search criteria...",
      jobs,
      total,
    });
  } catch (error) {
    console.error("Errors: ", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error!",
    });
  }
};

/**____________________________________________________________________*
 *                                                                     *
 *                     function to get a job by id                     *
 *         http://localhost:5000/api/jobs/671a889aa46349b51058b262     *
 *                                                                     *
 * ____________________________________________________________________*
 */
export const getJobByIdApi = async (req, res) => {
  try {
    const { id } = req.params; // Get the job ID from the route parameters

    // Find the job by ID
    const job = await Jobs.findById(id);

    // Check if the job exists
    if (!job) {
      return res.status(404).json({
        success: false,
        msg: "Job not found.",
      });
    }

    // If found, return the job details
    res.status(200).json({
      success: true,
      msg: "Job fetched successfully.",
      job,
    });
  } catch (error) {
    console.error("Errors: ", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error!",
    });
  }
};

//
//

/**______________________________________________________________________________________________*
 *                                                                                               *
 *                              Function to edit a job by ID                                     *
 *             http://localhost:5000/api/jobs/edit-job/671a889aa46349b51058b262                  *
 *                                                                                               *
 *_______________________________________________________________________________________________*/
export const editJobApi = async (req, res) => {
  try {
    const { id } = req.params; // Get the job ID from the route parameters
    const updatedData = req.body; // Get the updated job data from the request body

    // Find the job by ID and update it
    const updatedJob = await Jobs.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated job
      runValidators: true, // Validate the data before updating
    });

    // Check if the job exists
    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        msg: "Job not found.",
      });
    }

    // If updated successfully, return the updated job details
    res.status(200).json({
      success: true,
      msg: "Job updated successfully.",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Errors: ", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error!",
    });
  }
};

/**_______________________________________________________________________________________________*
 *                                                                                                *
 *                              Function to delete a job by ID                                    *
 *             http://localhost:5000/api/jobs/delete-job/671a889aa46349b51058b262                 *
 *                                                                                                *
 *________________________________________________________________________________________________*/
export const deleteJobApi = async (req, res) => {
  try {
    const { id } = req.params; // Get the job ID from the route parameters

    // Find the job by ID and delete it
    const deletedJob = await Jobs.findByIdAndDelete(id);

    // Check if the job was found and deleted
    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        msg: "Job not found.",
      });
    }

    // If deleted successfully, return a success message
    res.status(200).json({
      success: true,
      msg: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("Errors: ", error);
    res.status(500).json({
      success: false,
      msg: "Internal server error!",
    });
  }
};

/**_______________________________________________________________________________________________*
 *                                                                                                *
 *                              Function get to job with Employer userid                          *
 *             http://localhost:5000/api/jobs/get/job/employer/671ba524ffe22cb2a28cab0e           *
 *                                                                                                *
 *________________________________________________________________________________________________*/

export const getJobByUserId = async (req, res) => {
  const { employerId } = req.params;

  try {
    // Fetch jobs for the specific employer ID
    const jobs = await Jobs.find({ employer: employerId });
    const total = await Jobs.countDocuments({ employer: employerId });

    // Check if jobs exist for the employer
    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No jobs found for this employer ID.",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Fetched all jobs by the individual employer ID.",
      jobs,
      total,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while fetching jobs.",
      error: error.message,
    });
  }
};
