// backend/routes/api/notes.js
const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Note, Notebook, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateNote = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required.')
    .isLength({ max: 255 })
    .withMessage('Title must be less than 255 characters.'),
  check('content')
    .optional()
    .isString()
    .withMessage('Content must be a string.'),
  check('notebookId')
    .exists({ checkFalsy: true })
    .withMessage('Notebook ID is required.'),
  handleValidationErrors,
];


// GET /api/notes/:id - Get a single note by ID - WORKS
router.get('/:id', requireAuth, async (req, res, next) => {
  const note = await Note.findByPk(req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.json({ note });
});

// GET /api/notes/:notebookId - Get all notes for a specific notebook
router.get('/notebook/:notebookId', requireAuth, async (req, res) => {
  const notes = await Note.findAll({
    where: {
      userId: req.user.id,
      notebookId: req.params.notebookId,
    },
    order: [['updatedAt', 'DESC']],
  });

  res.json(notes);
});

// POST /api/notes - Create a new note - WORKS
router.post('/', requireAuth, validateNote, async (req, res, next) => {
  const { title, content, notebookId } = req.body;

  const newNote = await Note.create({
    title,
    content,
    notebookId: notebookId,
  });

  res.status(201).json({ newNote });
});

// PUT /api/notes/:id - Update an existing note - WORKS
router.put('/:id', requireAuth, validateNote, async (req, res, next) => {
  const { title, content, notebookId } = req.body;
  const note = await Note.findByPk(req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  note.title = title || note.title;
  note.content = content || note.content;
  note.notebookId = notebookId || note.notebookId;
  await note.save();

  res.json({ note });
});

// DELETE /api/notes/:id - Delete a note - WORKS
router.delete('/:id', requireAuth, async (req, res, next) => {
  const note = await Note.findByPk(req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  await note.destroy();
  res.json({ message: 'Successfully deleted' });
});

module.exports = router;
