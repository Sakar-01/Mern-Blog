import express from "express";
import {
    createArticles,
    getArticles,
    getSingleArticles,
    updateArticle,
    deleteArticle,
    // searchArticle
  } from "../controllers/articlesControllers.js";
const articlesRoutes = express.Router();

// Create a new article
articlesRoutes.post("/articles", createArticles);

// Get all articles
articlesRoutes.get("/articles", getArticles);

// Get article by ID
articlesRoutes.get("/articles/:id", getSingleArticles);

// Update article by ID
articlesRoutes.put("/articles/:id", updateArticle);

// Delete article by ID
articlesRoutes.delete("/articles/:id", deleteArticle);

// Search articles and sort by date
// articlesRoutes.get("/articles/search", searchArticle);

export default articlesRoutes;