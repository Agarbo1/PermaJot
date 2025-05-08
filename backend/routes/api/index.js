// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");
const notesRouter = require('./notes.js');
const notebooksRouter = require('./notebooks.js');
const tagsRouter = require('./tags.js');
const tasksRouter = require('./tasks.js');
const notetagsRouter = require('./notetags.js');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/notes', notesRouter);

router.use('/notebooks', notebooksRouter);

router.use('/tags', tagsRouter);

router.use('/tasks', tasksRouter);

router.use('/notetags', notetagsRouter);

// Test route to check if the API is working
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
