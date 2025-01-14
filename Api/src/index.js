import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieparser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import connectDb from "./db/connect.js";
import authRouter from "./routes/auth.router.js";
import submissionRouter from "./routes/submission.router.js";


connectDb(); //connects to db 


const app = express();
const PORT  = process.env.PORT || 8000;

//middlewares
app.use(helmet());
app.use(
    cors({
      origin: [process.env.ORIGIN],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );
app.use(cookieparser());
app.use(express.json());

//routes

app.use("/api/auth",authRouter);
app.use("/api/submissions",submissionRouter);


app.listen(PORT,()=>{
    console.log(`the server is running on the Port ${PORT}`);
})
