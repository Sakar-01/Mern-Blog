import {
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    ADD_ARTICLE_REQUEST,
    ADD_ARTICLE_SUCCESS, 
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS,
    GET_ARTICLE_SUCCESS 
  } from './types.js';
  
  const initialState = {
    loading: false,
    articles: [],
    singleArticle:[]
  };
  
  const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ARTICLES_REQUEST:
        return { ...state, loading: true };
      case GET_ARTICLES_SUCCESS:
        return { ...state, loading: false, articles: action.payload };
      case ADD_ARTICLE_REQUEST:
        return { ...state, loading: true };
      case ADD_ARTICLE_SUCCESS:
        return { ...state, loading: false, addedArticle: action.payload, };
        case EDIT_ARTICLE_REQUEST:
          return { ...state, loading: true };
        case EDIT_ARTICLE_SUCCESS:
          return { ...state, loading: false, editedArticle: action.payload };  
        case GET_ARTICLE_SUCCESS:
          return { ...state, loading: false, singleArticle: action.payload };  
      default:
        return state;
    }
  };
  
  export default articlesReducer;
  