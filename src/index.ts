import express, {
	Application,
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import AdminRoutes from "./v1/Routes/AdminRoutes";
import UserRoutes from "./v1/Routes/UsersRoutes";
import VideoRoutes from "./v1/Routes/VideoRoutes";
import mongoose from "mongoose";
import multer from "multer";
import { config } from "dotenv";
import cors from "cors";

const app: Application = express();

config({ path: __dirname + "src/.env" });

export const { DATABASE } = process.env as {
	[key: string]: string;
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//error handler
app.use(
	(
		err: ErrorRequestHandler,
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		if (err instanceof SyntaxError) {
			res.status(400).send({
				success: false,
				message: "Something went wrong, please try again",
			});
		} else if (err instanceof multer.MulterError) {
			if (err.code === "LIMIT_FILE_SIZE") {
				res.status(400).send({
					message: "File too large",
				});
			}
			if (err.code === "LIMIT_FIELD_COUNT") {
				res.status(400).send({
					message: "You can not upload more than one file",
				});
			}

			if (err.code === "LIMIT_UNEXPECTED_FILE") {
				res.status(400).send({
					message: "File should be an image",
				});
			}
		} else {
			res.status(500).send({
				success: false,
				message: "Something went wrong, please try again",
			});
		}
	}
);

//Api Routes
app.use("/api/admin", UserRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/video", VideoRoutes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, async () => {
	await mongoose
		.connect(
			"mongodb+srv://kwabena_abrokwa:0542656207Frank$@cluster0.djysi.mongodb.net/fundus?retryWrites=true&w=majority"
		)
		.then(() =>
			console.log(
				`Server running on Port ${PORT} Database connected successfully`
			)
		)
		.catch((error) => console.log(`Something went wrong ${error}`));
});
