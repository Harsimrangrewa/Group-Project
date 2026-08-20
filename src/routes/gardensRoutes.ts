import { Router, Request, Response } from "express";
import pool from "../db";
import authenticateToken from "../middleware/auth";

const router = Router();

// GET all gardens
router.get("/", authenticateToken, async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM gardens");

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Database error",
    });
  }
});

// CREATE a new garden
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { user_id, name, description, location } = req.body;

    if (!user_id || !name) {
      res.status(400).json({
        error: "User ID and garden name are required",
      });
      return;
    }

    const [result]: any = await pool.query(
      `INSERT INTO gardens
       (user_id, name, description, location)
       VALUES (?, ?, ?, ?)`,
      [user_id, name, description, location],
    );

    res.status(201).json({
      message: "Garden created successfully",
      id: result.insertId,
      user_id,
      name,
      description,
      location,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Database error",
    });
  }
});

// UPDATE a garden
router.put("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id, name, description, location } = req.body;

    if (!user_id || !name) {
      res.status(400).json({
        error: "User ID and garden name are required",
      });
      return;
    }

    const [result]: any = await pool.query(
      `UPDATE gardens
       SET user_id = ?,
           name = ?,
           description = ?,
           location = ?
       WHERE id = ?`,
      [user_id, name, description, location, id],
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Garden not found",
      });
      return;
    }

    res.status(200).json({
      message: "Garden updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Database error",
    });
  }
});

// DELETE a garden
router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const [result]: any = await pool.query(
        "DELETE FROM gardens WHERE id = ?",
        [id],
      );

      if (result.affectedRows === 0) {
        res.status(404).json({
          error: "Garden not found",
        });
        return;
      }

      res.status(200).json({
        message: "Garden deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Database error",
      });
    }
  },
);

export default router;
