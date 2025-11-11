import express from 'express'
import helmet from 'helmet';
import cors from 'cors'
import morgan from 'morgan';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import projectRouter from './routes/project';
import taskRouter from './routes/task';
import { errorHandler, notFound } from './middleware/error';
import { organizationRouter } from './routes/organization';
import path from 'path';

const app = express();

const corsOptions = {
    origin: true,
    credentials: true,
};


app.use(express.json())
const clientBuildPath = path.resolve(__dirname, "..", "public");
app.use(express.static(clientBuildPath));

// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(cookieParser())


app.get("/api/health", (_req, res) => res.json({ok: true}))

app.use("/api/auth", authRouter)
app.use("/api/organizations", organizationRouter);
app.use("/api/projects", projectRouter)
app.use("/api", taskRouter)

// const clientBuildPath = path.resolve(__dirname, "..", "public");
// app.use(express.static(clientBuildPath));

// app.get(/(.*)/, (req, res, next) => {
//     if (req.path.startsWith("/api")) return next();
//     res.sendFile(path.join(clientBuildPath, "index.html"));
// });

app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.use(notFound)
app.use(errorHandler)

// app.get("*", (_req, res) => {
//     res.sendFile(path.join(clientBuildPath, "index.html"));
// });

// app.get(/(.*)/, (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });


export default app