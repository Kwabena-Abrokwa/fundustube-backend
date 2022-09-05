import express, { Application } from "express";
import VideoRoutes from "./v1/Routes/VideoRoutes";
import cors from "cors";

const app: Application = express();

const PORT = 8081;

app.use(cors());
app.use(express.json());
app.use("/api/video", VideoRoutes);

app.listen(PORT, () => {
	console.log(`Running server on ${PORT}`);
});
