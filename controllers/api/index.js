const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoute');
const commentRoutes = require('./commentRoute');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
