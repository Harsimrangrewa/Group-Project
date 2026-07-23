import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password_hash, bio } = req.body;

    if (!name || !email || !password_hash) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const [result]: any = await pool.query(
      `INSERT INTO users
      (name, email, password_hash, bio)
      VALUES (?, ?, ?, ?)`,
      [name, email, password_hash, bio],
    );

    res.status(201).json({
      message: "User created successfully",
      id: result.insertId,
      name,
      email,
      bio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password_hash, bio } = req.body;

    if (!name || !email || !password_hash) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const [result]: any = await pool.query(
      `UPDATE users
       SET
       name = ?,
       email = ?,
       password_hash = ?,
       bio = ?
       WHERE id = ?`,
      [name, email, password_hash, bio, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Database error",
    });
  }
});

export default router;
