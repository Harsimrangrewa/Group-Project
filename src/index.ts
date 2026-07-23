import express from "express";
import cors from "cors";

import usersRoutes from "./routes/usersRoutes";
import gardensRoutes from "./routes/gardensRoutes";
import flowersRoutes from "./routes/flowersRoutes";
import eventsRoutes from "./routes/eventsRoutes";

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/gardens", gardensRoutes);
app.use("/flowers", flowersRoutes);
app.use("/events", eventsRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
