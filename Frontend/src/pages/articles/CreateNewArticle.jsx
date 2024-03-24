import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addArticle } from '../../redux/articles/articlesAction';
import { TextField, Button, Container, Paper, Typography,FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
const CreateNewArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const categories = ['Food', 'Education', 'Businessmen'];

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
          Create New Article
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
          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={articleData.category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            Create Article
          </Button>
          <Button component={Link} to={'/'} fullWidth>
            Cancel
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateNewArticle;
