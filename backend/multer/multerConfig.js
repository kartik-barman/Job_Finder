import multer from "multer";
import path from "path";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the upload destination folder
  },
  filename: (req, file, cb) => {
    // Use the original file name with a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create a multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
  },
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      return cb(new Error('Only PDF files are allowed!'), false);
    }
    cb(null, true);
  },
});

export const uploadResume = upload.single('resume'); // Export the upload middleware
