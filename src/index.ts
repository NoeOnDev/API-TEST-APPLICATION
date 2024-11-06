import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./_config/env.config";
import { connectWithRetry } from "./_helper/dbConnection";
import { authRoutes } from "./auth/infrastructure/http/routes/authRoutes";
import { userRoutes } from "./users/infrastructure/http/routes/userRoutes";

export const app = express();
const port = env.port.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

app.get("/", (_req, res) => {
  res.send("Welcome to the users API 🚀");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

connectWithRetry(10, 10000, () => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
  });
});
