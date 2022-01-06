import express from "express";
import member from "./member";
import noticeboard from "./noticeboard";
import post from "./post";
import meeting from "./meeting";

const apiRoute = express.Router();
apiRoute.use("/member", member);
apiRoute.use("/noticeboard", noticeboard);
apiRoute.use("/post", post);
apiRoute.use("/meeting", meeting);

export default apiRoute;
