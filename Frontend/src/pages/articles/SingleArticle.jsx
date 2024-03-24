import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams, Link } from 'react-router-dom';
import { getArticleById } from '../../redux/articles/articlesAction';
import { Container, Paper, Typography, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    ArrowBack
  } from "@mui/icons-material";
  
const SingleArticle = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { singleArticle, loading } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getArticleById(id));
  }, [dispatch, id]);

  if (loading || !singleArticle) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      style={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: '100%',
          padding: 20,
        }}
      >
        <Button component={Link} to={'/'} style={{marginBottom:'30px'}} startIcon={<ArrowBack/>}>Back</Button>

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
      </Paper>
    </Container>
  );
};

export default SingleArticle;
