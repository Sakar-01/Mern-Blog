import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addArticle } from '../../redux/articles/articlesAction';

const CreateNewArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    category: '',
    body: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addArticle(articleData));
    navigate('/')
  };

  return (
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
      <button type="submit">Create Article</button>
    </form>
  );
};

export default CreateNewArticle;