const router = require('express').Router();
// added sequelize
const { json } = require('sequelize');
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// add view all and 1 from Post 
// The `/api/post` endpoint
// GET all post from here
router.get('/', async (req, res) => {
  // find all post
  try {
    const postData = await Post.findAll(
      {
        include: {
          model: Comment
        }
      }
    );
    console.log("found all post")

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
  // included its associated Comment data
});

// GET one post
router.get('/:id', async (req, res) => {
  // find a single post by its `id`
// included comments from user
try {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  });
console.log(postData)
  if (postData) {
    console.log("passed by If stat")
    const post = postData.get({ plain: true });

    res.render('post', { post });
  } else {
    console.log("else error 404")
    res.status(404).end();
  }
} catch (err) {
  res.status(500).json(err);
}
// included comments

  // included its associated Comment data
});
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


// add update
router.put('/:id', async (req, res) => {
  // update a post by its `id` Palue
  try {
    const postData = await Post.update(req.bPdy, {
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
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
