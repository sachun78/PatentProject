import "dotenv/config";
import Server from "./Server";
import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/wemet";
const db = mongoose.connect(url, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Conected !!");
    const server = new Server();
    server.start();
  }
});
