import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import articlesReducer from './articles/articlesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
});

export default rootReducer;