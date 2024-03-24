import express from "express";
import {
    createArticles,
    getArticles,
    getSingleArticles,
    updateArticle,
    deleteArticle,
    searchArticle
  } from "../controllers/articlesControllers.js";
  import { verifyToken } from "../utils/token-manager.js";
  const articlesRoutes = express.Router();

// Create a new article
articlesRoutes.post("/articles",verifyToken, createArticles);

// Get all articles
articlesRoutes.get("/articles", getArticles);

// Get article by ID
articlesRoutes.get("/articles/:id",verifyToken, getSingleArticles);

// Update article by ID
articlesRoutes.put("/articles/:id",verifyToken, updateArticle);

// Delete article by ID
articlesRoutes.delete("/articles/:id",verifyToken, deleteArticle);

// Search articles and sort by date
articlesRoutes.get("/articles/search/:keyword",verifyToken, searchArticle);

export default articlesRoutes;