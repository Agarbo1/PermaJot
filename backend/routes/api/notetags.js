const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Tag, Note } = require('../../db/models');


//Add a tag to a note
router.post('/:id', requireAuth, async (req, res) => {
  const { tagId } = req.body;
  const noteId = req.params.id;

  // Check if the note exists and belongs to the user
  const note = await Note.findByPk(noteId);
  if (!note || note.userId !== req.user.id) {
    return res.status(404).json({ message: 'Note not found' });
  }

  // Check if the tag exists and belongs to the user
  const tag = await Tag.findByPk(tagId);
  if (!tag || tag.userId !== req.user.id) {
    return res.status(404).json({ message: 'Tag not found' });
  }

  // Add the tag to the note
  await note.addTag(tag);

  res.status(200).json({ message: 'Tag added to note successfully' });

});

// GET /api/notetags/:id - Get all tags for a given note
router.get('/:id', requireAuth, async (req, res) => {
  const noteId = req.params.id;

  const note = await Note.findByPk(noteId, {
    include: {
      model: Tag,
      through: { attributes: [] }, // Exclude NoteTag join table info
      order: [['name', 'ASC']]
    }
  });

  if (!note || note.userId !== req.user.id) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json(note.Tags); // Capitalized if association is set as `Note.belongsToMany(Tag)`
});


// Remove a tag from a note
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
