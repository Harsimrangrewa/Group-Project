import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// GET all flowers
router.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM flowers");
  res.json(rows);
});

// Post = it create a new flower
router.post("/", async (req: Request, res: Response) => {
  const { user_id, common_name, scientific_name, season, color, description } =
    req.body;

  if (!user_id || !common_name) {
    res.status(400).json({ error: "user_id and common_name are required" });
    return;
  }

  const [result]: any = await pool.query(
    `INSERT INTO flowers 
    (user_id, common_name, scientific_name, season, color, description)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, common_name, scientific_name, season, color, description],
  );

  res.status(201).json({
    id: result.insertId,
    user_id,
    common_name,
    scientific_name,
    season,
    color,
    description,
  });
});

// Put = it update a flower
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { common_name, scientific_name, season, color, description } = req.body;

  const [result]: any = await pool.query(
    `UPDATE flowers 
     SET common_name = ?, scientific_name = ?, season = ?, color = ?, description = ?
     WHERE id = ?`,
    [common_name, scientific_name, season, color, description, id],
  );

  if (result.affectedRows === 0) {
    res.status(404).json({ error: "Flower not found" });
    return;
  }

  res.json({
    success: true,
    id,
    common_name,
    scientific_name,
    season,
    color,
    description,
  });
});

// Delete = it removes a flower
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const [result]: any = await pool.query("DELETE FROM flowers WHERE id = ?", [
    id,
  ]);

  if (result.affectedRows === 0) {
    res.status(404).json({ error: "Flower not found" });
    return;
  }

  res.json({ success: true, message: `Flower ${id} deleted` });
});

export default router;
