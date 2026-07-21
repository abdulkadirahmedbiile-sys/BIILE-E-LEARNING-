import { Router, Response } from 'express';
import pool from '../config/database';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth.middleware';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get lessons for a course
router.get('/course/:courseId', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const result = await pool.query(
      'SELECT * FROM lessons WHERE course_id = $1 ORDER BY order ASC',
      [courseId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Get single lesson
router.get('/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM lessons WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

// Create lesson
router.post('/', authenticate, authorize(['teacher', 'admin']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { courseId, title, description, videoUrl, duration, order, resources } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const lessonId = uuidv4();
    const result = await pool.query(
      'INSERT INTO lessons (id, course_id, title, description, video_url, duration, order_index, resources, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [lessonId, courseId, title, description, videoUrl, duration || 0, order || 1, JSON.stringify(resources || []), new Date(), new Date()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lesson' });
  }
});

// Mark lesson as completed
router.post('/:lessonId/complete', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const studentId = req.user?.id;

    // Check if already completed
    const completed = await pool.query(
      'SELECT * FROM lesson_completions WHERE lesson_id = $1 AND student_id = $2',
      [lessonId, studentId]
    );

    if (completed.rows.length > 0) {
      return res.status(200).json({ message: 'Lesson already completed' });
    }

    const completionId = uuidv4();
    await pool.query(
      'INSERT INTO lesson_completions (id, lesson_id, student_id, completed_at) VALUES ($1, $2, $3, $4)',
      [completionId, lessonId, studentId, new Date()]
    );

    res.status(201).json({ message: 'Lesson marked as completed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark lesson as completed' });
  }
});

export default router;
