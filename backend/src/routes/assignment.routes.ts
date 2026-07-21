import { Router, Response } from 'express';
import pool from '../config/database';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth.middleware';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get assignments for a course
router.get('/course/:courseId', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const result = await pool.query(
      'SELECT * FROM assignments WHERE course_id = $1 ORDER BY due_date ASC',
      [courseId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// Create assignment
router.post('/', authenticate, authorize(['teacher', 'admin']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { courseId, title, description, dueDate, totalPoints } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const assignmentId = uuidv4();
    const result = await pool.query(
      'INSERT INTO assignments (id, course_id, title, description, due_date, total_points, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [assignmentId, courseId, title, description, dueDate, totalPoints || 100, new Date(), new Date()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create assignment' });
  }
});

// Submit assignment
router.post('/:assignmentId/submit', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { assignmentId } = req.params;
    const { submissionUrl } = req.body;
    const studentId = req.user?.id;

    if (!submissionUrl) {
      return res.status(400).json({ error: 'Submission URL required' });
    }

    const submissionId = uuidv4();
    const result = await pool.query(
      'INSERT INTO submissions (id, assignment_id, student_id, submission_url, submitted_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [submissionId, assignmentId, studentId, submissionUrl, new Date()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit assignment' });
  }
});

// Grade submission
router.put('/submission/:submissionId/grade', authenticate, authorize(['teacher', 'admin']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;

    const result = await pool.query(
      'UPDATE submissions SET grade = $1, feedback = $2, graded_at = $3 WHERE id = $4 RETURNING *',
      [grade, feedback, new Date(), submissionId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to grade submission' });
  }
});

export default router;
