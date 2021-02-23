import { Router } from "express";
import authRoute from "./routes/auth";
import voteRoute from "./routes/vote";
import userRoute from "./routes/user";


export default () => {
	const routerApp = Router();
	// Adding routes
	authRoute(routerApp);
	voteRoute(routerApp);
	userRoute(routerApp);

	return routerApp;
}