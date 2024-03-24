import axios from 'axios';
import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  ADD_ARTICLE_REQUEST,
  ADD_ARTICLE_SUCCESS,
  EDIT_ARTICLE_REQUEST,
  EDIT_ARTICLE_SUCCESS,
} from './types.js';

export const getArticles = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ARTICLES_REQUEST });
    const { data } = await axios.get('/api/v1/articles/articles');
    dispatch({ type: GET_ARTICLES_SUCCESS, payload: data });
  } catch (error) {
    console.log(error)
  }
};
export const addArticle = (articleData) => async (dispatch) => {
    try {
      dispatch({ type: ADD_ARTICLE_REQUEST });
      const { data } = await axios.post('/api/v1/articles/articles', articleData);
      dispatch({ type: ADD_ARTICLE_SUCCESS, payload: data });
    } catch (error) {
    //   dispatch({ type: ADD_ARTICLE_FAILURE, payload: error.message });
    }
  };
  export const editArticle = (articleId, updatedArticleData) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_ARTICLE_REQUEST });
      const { data } = await axios.put(`/api/v1/articles/articles/${articleId}`, updatedArticleData);
      dispatch({ type: EDIT_ARTICLE_SUCCESS, payload: data });
    } catch (error) {
    //   dispatch({ type: EDIT_ARTICLE_FAILURE, payload: error.message });
    }
  };
  export const getArticleById = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_ARTICLES_REQUEST });
  
      const { data } = await axios.get(`/api/v1/articles/articles/${id}`); 
  
      dispatch({ type: GET_ARTICLES_SUCCESS, payload: data });
    } catch (error) {
      // dispatch({ type: GET_ARTICLE_FAILURE, payload: error.message });
    }
  };