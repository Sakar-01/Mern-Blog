import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArticles } from '../../redux/articles/articlesAction';
import { searchArticles } from '../../redux/articles/articlesAction';

const Articles = () => {
  const dispatch = useDispatch();
  const { loading, articles, error } = useSelector((state) => state.articles);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortByDateAsc, setSortByDateAsc] = useState(true);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(searchArticles(searchTerm));
  };
  const handleSortToggle = () => {
    setSortByDateAsc((prevState) => !prevState); // Toggle sort order
  };

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortByDateAsc) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div>
    <div>
        <button onClick={handleSortToggle}>
          {sortByDateAsc ? 'Sort by Date Asc' : 'Sort by Date Desc'}
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search articles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h1>All Articles</h1>
          <ul>
            {sortedArticles.map((article) => (
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
