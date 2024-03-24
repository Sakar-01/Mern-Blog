import Articles from "../models/articles-model.js";

export const createArticles = async (req, res) => {
  try {
    const { title, description, category, body } = req.body;
    const newArticle = new Articles({ title, description, category, body });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
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
    const { title, description, category, body } = req.body;
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
    const deletedArticle = await Articles.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};