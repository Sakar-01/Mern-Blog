import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeScreen from "./pages/HomeScreen";
import NotFound from "./pages/NotFound";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PrivateRoute from "./utils/PrivateRoute";
import Navigation from "./components/Navigation";
import { Provider } from 'react-redux';
import store from './redux/store'; 

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
              <Route exact path="/" element={<HomeScreen />} />
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
