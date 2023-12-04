const router = require('express').Router();
// added sequelize
const { json } = require('sequelize');
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// include all post and comments through here

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    const newComment = await Comment.create({
      user_id: req.session.user_id,
      post_id: newPost.id,
      comment: req.body.comment,
    });
    // add blog comments 
    const post = newPost.get({ plain: true })
    const comment = newComment.get({ plain: true })
    console.log(post)
    console.log(comment)
    post.comment = comment.comment

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
