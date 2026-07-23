import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// Get all gardens
router.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM gardens");
  res.json(rows);
});

// Post = it create a new garden
router.post("/", async (req: Request, res: Response) => {
  const { user_id, name, description, location } = req.body;

  if (!user_id || !name) {
    res.status(400).json({ error: "user_id and name are required" });
    return;
  }

  const [result]: any = await pool.query(
    `INSERT INTO gardens (user_id, name, description, location)
     VALUES (?, ?, ?, ?)`,
    [user_id, name, description, location],
  );

  res.status(201).json({
    id: result.insertId,
    user_id,
    name,
    description,
    location,
  });
});

// Put = it update a garden
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, location } = req.body;

  const [result]: any = await pool.query(
    `UPDATE gardens
     SET name = ?, description = ?, location = ?
     WHERE id = ?`,
    [name, description, location, id],
  );

  if (result.affectedRows === 0) {
    res.status(404).json({ error: "Garden not found" });
    return;
  }

  res.json({
    success: true,
    id,
    name,
    description,
    location,
  });
});

// Delete = it removes a garden
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const [result]: any = await pool.query("DELETE FROM gardens WHERE id = ?", [
    id,
  ]);

  if (result.affectedRows === 0) {
    res.status(404).json({ error: "Garden not found" });
    return;
  }

  res.json({ success: true, message: `Garden ${id} deleted` });
});

export default router;
