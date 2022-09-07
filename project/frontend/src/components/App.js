import Navbar from './NavBar';
import Contents from './Contents';
import { BrowserRouter as Router } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import React, {useState} from 'react';
import { AuthProvider } from './AuthContext';


// Initialize locales.
if (TimeAgo.getDefaultLocale() === undefined){
  TimeAgo.addDefaultLocale(en)
}


function App() {

  return (
    <AuthProvider>
        <Router>
          <Navbar />
          <Contents />
        </Router>
      </AuthProvider>
  );
}

export default App;
