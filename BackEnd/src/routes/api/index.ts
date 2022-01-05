import express from "express";
import member from "./member";
import noticeboard from "./noticeboard";

const apiRoute = express.Router();
apiRoute.use("/member", member);
apiRoute.use("/noticeboard", noticeboard);

export default apiRoute;
