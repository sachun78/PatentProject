import express from "express";
import member from "./member";
import noticeboard from "./noticeboard";
import post from "./post";
import meeting from "./meeting";
import mynetwork from "./mynetwork";
import event from "./event";

const apiRoute = express.Router();
apiRoute.use("/member", member);
apiRoute.use("/noticeboard", noticeboard);
apiRoute.use("/post", post);
apiRoute.use("/meeting", meeting);
apiRoute.use("/mynetwork", mynetwork);
apiRoute.use("/event", event);

export default apiRoute;
