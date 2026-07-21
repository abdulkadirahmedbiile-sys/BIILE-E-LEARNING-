import { Router, Response } from 'express';
import pool from '../config/database';
import { authenticate, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();

// Get user profile
router.get('/profile', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, avatar, bio, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { firstName, lastName, bio, avatar } = req.body;

    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, bio = $3, avatar = $4, updated_at = $5 WHERE id = $6 RETURNING *',
      [firstName, lastName, bio, avatar, new Date(), userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user's courses (for students)
router.get('/courses', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await pool.query(
      'SELECT c.* FROM courses c JOIN enrollments e ON c.id = e.course_id WHERE e.student_id = $1',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

export default router;
