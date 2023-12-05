const router = require('express').Router();
// added sequelize
// const { json } = require('sequelize');
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// include all post and comments through here

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // add blog comments 
    console.log(newPost)
    console.log("Ready to post comments")

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add update
router.put('/:id', async (req, res) => {
  // update a post by its `id` Value
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err);
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
