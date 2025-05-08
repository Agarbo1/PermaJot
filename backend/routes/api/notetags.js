const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Tag, Note } = require('../../db/models');

router.post('/:id', requireAuth, async (req, res) => {
  const { tagId } = req.body;
  const noteId = req.params.id;

  // Find the note by ID
  const note = await Note.findByPk(noteId);

  if (!note || note.userId !== req.user.id) {
    return res.status(404).json({ message: 'Note not found' });
  }

  // Add the tag to the note
  await note.addTag(tagId);

  res.status(200).json({ message: 'Tag added to note successfully' });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { tagId } = req.body;
  const noteId = req.params.id;

  // Find the note by ID
  const note = await Note.findByPk(noteId);

  if (!note || note.userId !== req.user.id) {
    return res.status(404).json({ message: 'Note not found' });
  }

  // Remove the tag from the note
  await note.removeTag(tagId);

  res.status(200).json({ message: 'Tag removed from note successfully' });
});

module.exports = router;
