const Post = require("../model/Post");

const getAllPosts = async (req, res) => {
  const posts = (await Post.find()).sort((a, b) => a.id - b.id);
  posts
    ? res.status(200).json(posts)
    : res.status(204).json("no posts to display");
};

const createPost = async (req, res) => {
  const { id, title, dateTime, postBody } = req.body;
  if (
    !req.body ||
    !req.body.id ||
    !req.body.title ||
    !req.body.dateTime ||
    !req.body.postBody
  )
    return res.status(400).json({ message: "all fields are required" });
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (req, res) => {
  const { id, title, dateTime, postBody, likes, disLikes } = req.body;
  if (
    !req.body ||
    !req.body.id ||
    !req.body.title ||
    !req.body.dateTime ||
    !req.body.postBody
  )
    return res.status(400).json({ message: "all fields are required" });

  const foundPost = await Post.findOne({ id: id });
  if (!foundPost) res.status(400).json(`no post with id ${id} was found`);
  try {
    foundPost.title = title;
    foundPost.dateTime = dateTime;
    foundPost.postBody = postBody;
    foundPost.likes = likes;
    foundPost.disLikes = disLikes;

    await foundPost.save();
    res.status(201).json(foundPost);
  } catch (err) {
    console.log(err);
  }
};

const updatePostComments = async (req, res) => {
  const { id, dateTime, title } = req.body;
  const comment = req.body.postBody;
  if (
    !req.body ||
    !req.body.id ||
    !req.body.title ||
    !req.body.dateTime ||
    !req.body.postBody
  )
    return res.status(400).json({ message: "all fields are required" });
    const foundPost = await Post.findOne({ id: id });
  const result = await Post.findOneAndUpdate(
    { id: id },
      {
          comments: [...foundPost.comments, {
              id: foundPost.comments.length ? foundPost.comments.length + 1 : 1,
              title,
              dateTime,
              postBody: comment
          }
          
      ] },
    { new: true }
  );
  res.status(201).json(result);
};

const deletePost = async (req, res) => {
  if (!req.body?.id) res.status(400).json("post id is required");
  const id = req.body.id;
  const result = await Post.findOneAndDelete({ id: id }).exec();
  result
    ? res.status(200).json(`post with id ${id} is deleted `)
    : res.status(400).json(`no post with id ${id} was found`);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const foundPost = await Post.findOne({ id: Number(id) }).exec();
  foundPost
    ? res.status(200).json(foundPost)
    : res.status(400).json(`no post with id ${id} was found`);
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
  updatePostComments,
  getPost,
};
