import { Router, Request, Response } from "express";
import pool from "../db";
import authenticateToken from "../middleware/auth";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM events");
  res.json(rows);
});

router.post("/", authenticateToken, async (req: Request, res: Response) => {
  const { user_id, title, date, description } = req.body;

  if (!user_id || !title) {
    res.status(400).json({ error: "user_id and title are required" });
    return;
  }

  const [result]: any = await pool.query(
    `INSERT INTO events (user_id, title, date, description)
     VALUES (?, ?, ?, ?)`,
    [user_id, title, date, description],
  );

  res.status(201).json({
    id: result.insertId,
    user_id,
    title,
    date,
    description,
  });
});

router.put("/:id", authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, date, description } = req.body;

  const [result]: any = await pool.query(
    `UPDATE events
     SET title = ?, date = ?, description = ?
     WHERE id = ?`,
    [title, date, description, id],
  );

  if (result.affectedRows === 0) {
    res.status(404).json({ error: "Event not found" });
    return;
  }

  res.json({
    success: true,
    id,
    title,
    date,
    description,
  });
});

router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const [result]: any = await pool.query("DELETE FROM events WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    res.json({ success: true, message: `Event ${id} deleted` });
  },
);

export default router;
