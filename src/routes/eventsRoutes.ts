import { Router, Request, Response } from "express";
import pool from "../db";
import authenticateToken from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken, async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM events");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const {
      garden_id,
      organizer_id,
      title,
      description,
      event_date,
      max_attendees,
    } = req.body;

    if (!garden_id || !organizer_id || !title || !event_date) {
      return res.status(400).json({
        error: "garden_id, organizer_id, title and event_date are required",
      });
    }

    const [result]: any = await pool.query(
      `INSERT INTO events
      (garden_id, organizer_id, title, description, event_date, max_attendees)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [garden_id, organizer_id, title, description, event_date, max_attendees],
    );

    res.status(201).json({
      id: result.insertId,
      garden_id,
      organizer_id,
      title,
      description,
      event_date,
      max_attendees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

router.put("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      garden_id,
      organizer_id,
      title,
      description,
      event_date,
      max_attendees,
    } = req.body;

    if (!garden_id || !organizer_id || !title || !event_date) {
      return res.status(400).json({
        error: "garden_id, organizer_id, title and event_date are required",
      });
    }

    const [result]: any = await pool.query(
      `UPDATE events
       SET garden_id = ?,
           organizer_id = ?,
           title = ?,
           description = ?,
           event_date = ?,
           max_attendees = ?
       WHERE id = ?`,
      [
        garden_id,
        organizer_id,
        title,
        description,
        event_date,
        max_attendees,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    res.status(200).json({
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

router.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const [result]: any = await pool.query(
        "DELETE FROM events WHERE id = ?",
        [id],
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Event not found",
        });
      }

      res.status(200).json({
        message: "Event deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Database error" });
    }
  },
);

export default router;
