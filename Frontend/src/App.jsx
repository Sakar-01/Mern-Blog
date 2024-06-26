import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Articles from "./pages/articles/Articles";
import NotFound from "./pages/NotFound";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PrivateRoute from "./utils/PrivateRoute";
import Navigation from "./components/Navigation";
import { Provider } from 'react-redux';
import store from './redux/store'; 
import CreateNewArticle from './pages/articles/CreateNewArticle';
import EditArticle from './pages/articles/EditArticle';
import SingleArticle from './pages/articles/SingleArticle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f3963',
    },
    secondary: {
      main: '#FF4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
  },
});


function App() {

  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation/>
        <Routes>
          {/* @Private Routes */}
          <Route path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Articles />} />
              <Route path="/new-article" element={<CreateNewArticle />} />
              <Route path="/edit/:id" element={<EditArticle/>} />
              <Route path="/article/:id" element={<SingleArticle/>} />
          </Route>
          {/* @Public Routes */}
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
