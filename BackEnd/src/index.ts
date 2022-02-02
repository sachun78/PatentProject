import Server from "./Server";
import { connectDB } from 'database/database';

connectDB()
  .then(() => {
    console.log("Succesfully Conected !!");
    const server = new Server();
    server.start();
  })
  .catch(console.log);