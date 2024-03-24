import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getArticleById, editArticle } from '../../redux/articles/articlesAction';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const EditArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    category: '',
    body: '',
  });

  const { singleArticle, loading } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getArticleById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleArticle) {
      setArticleData({
        title: singleArticle.title,
        description: singleArticle.description,
        category: singleArticle.category,
        body: singleArticle.body,
      });
    }
  }, [singleArticle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editArticle(id, articleData));
    navigate('/');
  };

  return (
    <Container style={{
      height: '90vh',
      marginTop:'20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Paper style={{
          width: isSmallScreen ? '90%' : 400,
          padding: 20,
        }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Edit Article
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Description"
            type="text"
            name="description"
            value={articleData.description}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Category"
            type="text"
            name="category"
            value={articleData.category}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Body"
            name="body"
            value={articleData.body}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Save Changes
          </Button>
          <Button component={Link} to={'/'} fullWidth>
            Cancel
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditArticle;