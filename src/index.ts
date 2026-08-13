import express from "express";
import cors from "cors";

import usersRoutes from "./routes/usersRoutes";
import gardensRoutes from "./routes/gardensRoutes";
import flowersRoutes from "./routes/flowersRoutes";
import eventsRoutes from "./routes/eventsRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/index";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/gardens", gardensRoutes);
app.use("/flowers", flowersRoutes);
app.use("/events", eventsRoutes);
app.use("/auth", authRoutes);
app.use("/", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
