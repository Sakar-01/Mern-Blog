
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArticles } from '../../redux/articles/articlesAction';

const Articles = () => {
  const dispatch = useDispatch();
  const { loading, articles, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h1>All Articles</h1>
          <ul>
            {articles.map((article) => (
              <li key={article._id}>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p>{article.body}</p>
                <p>Category: {article.category}</p>
                <Link to={`/edit/${article._id}`}>Edit</Link>
              </li>
            ))}
          </ul>
          <Link to="/new-article">Create New Article</Link>
        </div>
      )}
    </div>
  );
};

export default Articles;