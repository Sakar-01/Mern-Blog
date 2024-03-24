import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleById, editArticle } from '../../redux/articles/articlesAction';

const EditArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    category: '',
    body: '',
  });
  const { articles, loading } = useSelector((state) => state.articles);
  useEffect(() => {
    dispatch(getArticleById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (articles) {
      setArticleData({
        title: articles.title,
        description: articles.description,
        category: articles.category,
        body: articles.body,
      });
    }
  }, [articles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editArticle(id, articleData));
    navigate('/')
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={articleData.title}
            onChange={handleChange}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={articleData.description}
            onChange={handleChange}
          />
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={articleData.category}
            onChange={handleChange}
          />
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={articleData.body}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditArticle;
