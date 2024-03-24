import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getArticles,
  searchArticles,
  deleteArticle,
} from "../../redux/articles/articlesAction";
import {
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import {
  AddCircleOutline,
  Search,
  Sort,
  Edit,
  Delete,
} from "@mui/icons-material";

const Articles = () => {
  const dispatch = useDispatch();
  const { loading, articles } = useSelector((state) => state.articles);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByDateAsc, setSortByDateAsc] = useState(true);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(searchArticles(searchTerm));
  };

  const handleSortToggle = () => {
    setSortByDateAsc((prevState) => !prevState);
  };

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortByDateAsc) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(deleteArticle(id));
    }
  };
  return (
    <Grid container style={{ justifyContent: "center", padding: "0 20px" }}>
      <Button
        component={Link}
        to="/new-article"
        variant="contained"
        color="primary"
        endIcon={<AddCircleOutline />}
        style={{ margin: "20px 0" }}
      >
        Create New Article
      </Button>

      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{ margin: "20px 0" }}
      >
        <Grid item xs={6} sm={6} md={6}>
          <TextField
            type="text"
            placeholder="Search articles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <IconButton variant="outlined" onClick={handleSearch}>
            <Search />
          </IconButton>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Button
            variant="outlined"
            onClick={handleSortToggle}
            fullWidth
            endIcon={<Sort />}
          >
            {sortByDateAsc ? "Sort by Date Asc" : "Sort by Date Desc"}
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={3}>
          {sortedArticles.map((article) => (
            <Grid key={article._id} item xs={12} sm={6} md={4}>
              <Card
                variant="outlined"
                sx={{
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                }}
              >
                <CardContent>
                  <Link to={`/articles/${article._id}`} style={{textDecoration: 'none'}}>
                    <Typography variant="h6" component="div">
                      {article.title}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="textSecondary">
                    {article.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.body}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {article.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {new Date(article.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Created By: {article.createdBy}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/edit/${article._id}`}
                    variant="outlined"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(article._id)}
                    variant="outlined"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default Articles;
