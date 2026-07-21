import { Router, Response } from 'express';
import pool from '../config/database';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth.middleware';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all courses
router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { category, level, search } = req.query;
    let query = 'SELECT * FROM courses WHERE 1=1';
    const params: any[] = [];

    if (category) {
      query += ` AND category = $${params.length + 1}`;
      params.push(category);
    }

    if (level) {
      query += ` AND level = $${params.length + 1}`;
      params.push(level);
    }

    if (search) {
      query += ` AND (title ILIKE $${params.length + 1} OR description ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
      params.push(`%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID
router.get('/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Create course (teachers only)
router.post('/', authenticate, authorize(['teacher', 'admin']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, category, level, price } = req.body;
    const teacherId = req.user?.id;

    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const courseId = uuidv4();
    const result = await pool.query(
      'INSERT INTO courses (id, title, description, teacher_id, category, level, price, student_count, rating, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [courseId, title, description, teacherId, category, level || 'beginner', price || 0, 0, 0, new Date(), new Date()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update course (teachers only)
router.put('/:id', authenticate, authorize(['teacher', 'admin']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, category, level, price, thumbnail } = req.body;
    const teacherId = req.user?.id;

    // Check if user is course owner
    const courseCheck = await pool.query('SELECT teacher_id FROM courses WHERE id = $1', [id]);
    if (courseCheck.rows[0]?.teacher_id !== teacherId && req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      'UPDATE courses SET title = $1, description = $2, category = $3, level = $4, price = $5, thumbnail = $6, updated_at = $7 WHERE id = $8 RETURNING *',
      [title, description, category, level, price, thumbnail, new Date(), id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Enroll in course
router.post('/:courseId/enroll', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user?.id;

    // Check if already enrolled
    const enrolled = await pool.query(
      'SELECT * FROM enrollments WHERE course_id = $1 AND student_id = $2',
      [courseId, studentId]
    );

    if (enrolled.rows.length > 0) {
      return res.status(400).json({ error: 'Already enrolled' });
    }

    const enrollmentId = uuidv4();
    await pool.query(
      'INSERT INTO enrollments (id, course_id, student_id, enrolled_at) VALUES ($1, $2, $3, $4)',
      [enrollmentId, courseId, studentId, new Date()]
    );

    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll' });
  }
});

export default router;
