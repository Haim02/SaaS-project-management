import http from 'http'
import dotenv from 'dotenv'
import app from './src/app';
import { connectDB } from './src/db/mongoose';

const port = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  await connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`server run on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('err= ', err)
  })

}

startServer();