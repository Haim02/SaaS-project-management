import * as http from 'http'
import app from './app';
import { connectDB } from './db/mongoose';

const port = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

async function startServer() {
    await connectDB()
        .then(() => {
            server.listen(port, "0.0.0.0", () => {
                console.log(`server run on port ${port}`);
            });
        })
        .catch((err) => {
            console.log('err= ', err)
        })

}

startServer();