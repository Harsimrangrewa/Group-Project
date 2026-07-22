import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM flowers");
  res.json(rows);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, color } = req.body;

  if (!name || !color) {
    res.status(400).json({ error: "Name and color are required" });
    return;
  }

  const [result]: any = await pool.query(
    "INSERT INTO flowers (name, color) VALUES (?, ?)",
    [name, color],
  );

  res.status(201).json({ id: result.insertId, name, color });
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, color } = req.body;

  if (!name || !color) {
    res.status(400).json({ error: "Name and color are required" });
    return;
  }

  const [result]: any = await pool.query(
    "UPDATE flowers SET name = ?, color = ? WHERE id = ?",
    [name, color, id],
  );

  if (result.affectedRows === 0) {
    res.status(404).json({ error: "Flower not found" });
    return;
  }

  res.json({ success: true, id, name, color });
});

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
