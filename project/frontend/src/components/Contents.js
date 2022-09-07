import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import Listing from './Listing';
import Login from './Login';
import Signup from './Signup.js';
import Dashboard from './dashboard';
import Error from './Error';



class Contents extends React.Component {
    render() { 
        return (
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/listing/:id" element={<Listing />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/error" element={<Error />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          );
    }
}

export default Contents;