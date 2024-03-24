import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getArticleById } from '../../redux/articles/articlesAction';
import { Container, Paper, Typography, Button } from '@mui/material';

const SingleArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { singleArticle, loading } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getArticleById(id));
  }, [dispatch, id]);

  if (loading || !singleArticle) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Paper style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          {singleArticle.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Category: {singleArticle.category}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Description: {singleArticle.description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Body: {singleArticle.body}
        </Typography>
        <Button component={Link} to={'/'}>Back</Button>
      </Paper>
    </Container>
  );
};

export default SingleArticle;
