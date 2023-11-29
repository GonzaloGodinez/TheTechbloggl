const router = require('express').Router();
// added sequelize
const { json } = require('sequelize');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
// add put and view all and 1 from Post 
// here
// The `/api/post` endpoint

// GET all post
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
    res.status(200).json(posttData);
  } catch (err) {
    res.status(500).json(err);
  }
  // included its associated Comment data
});

// GET one post
router.get('/:id', async (req, res) => {
  // find a single post by its `id`
  try {
    const postData = await Post.findOne(
      { where:{
        id: req.params.id
      },
      include:  {
        model: Comment
      }
      }
    );
    if (!postData) {
      return res.status(404).json({message: 'no Post found for this id'})
    }
    res.status(200).json(postData)
  } catch(err) {
    res.status(500).json(err);
  }
  // included its associated Comment data
});
// there

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
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
