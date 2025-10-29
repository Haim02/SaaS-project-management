import express from 'express'
import helmet from 'helmet';
import cors from 'cors'
import { env } from 'process';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import projectRouter from './routes/project';
import taskRouter from './routes/task';
import { errorHandler, notFound } from './middleware/error';
import { organizationRouter } from './routes/organization';

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost',
    credentials: true
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.get("/api/health", (_req, res) => res.json({ok: true}))

app.use("/api/auth", authRouter)
app.use("/api/organizations", organizationRouter);
app.use("/api/projects", projectRouter)
app.use("/api", taskRouter)

app.use(notFound)
app.use(errorHandler)

// app.get(/(.*)/, (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });


export default app