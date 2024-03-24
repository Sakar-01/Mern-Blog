import Articles from "../models/articles-model.js";
import Users from "../models/users-model.js";

export const createArticles = async (req, res) => {
  try {
    const { title, description, category, body } = req.body;
    const user = await Users.findById(res.locals.jwtData.id);
    const newArticle = new Articles({ title, description, category, body,userId: user._id,createdBy: user.name });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
export const getArticles = async (req, res) => {
  try {
    const articles = await Articles.find()
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getSingleArticles = async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateArticle = async (req, res) => {
  try {
    const user = await Users.findById(res.locals.jwtData.id);

    const { title, description, category, body, userId } = req.body;
    console.log(userId)
    if (user._id.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Access Unauthorized" });
    }

    const updatedArticle = await Articles.findByIdAndUpdate(
      req.params.id,
      { title, description, category, body },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const user = await Users.findById(res.locals.jwtData.id);
    if (user._id.toString() !== article.userId.toString()) {
      return res.status(401).json({ error: "Access Unauthorized" });
    }

    const deletedArticle = await Articles.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ error: "Failed to delete article" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const searchArticle = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    if (!keyword) {
      return res.status(400).json({ message: 'Keyword parameter is required' });
    }
    const articles = await Articles.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { body: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ],
    });


    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};