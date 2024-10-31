import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import connectDb from "./utils/db.js";
import jobsRouter from "./routes/jobsRoutes.js";
import userRouter from "./routes/userRoutes.js"
import JobApplicationRouter from "./routes/jobApplicationRoute.js"
dotenv.config()

const app = express();


app.get("/", (req, res)=>{
    res.status(200).send("Your Server is working Successfully!.............")
})

app.use(cors({
    origin: ["http://localhost:3000", "https://your-frontend-url.com"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  }));
  
app.use(bodyParser.json())

// Job Endpoint
app.use("/api/jobs", jobsRouter);

// Users Endpoint
app.use("/api/users", userRouter);

// Job Application Endpoint
app.use("/api/job/application", JobApplicationRouter)

const port = process.env.PORT || 5000

connectDb().then(()=>{
    app.listen(port, ()=>{
        console.log(`Welcome Mr Kartik Barman\nYour Server running at http://localhost:${port}`);
    })
})
