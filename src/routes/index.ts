import express from "express";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/dashboard", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the dashboard!",
    user: (req as any).user,
  });
});

export default router;
