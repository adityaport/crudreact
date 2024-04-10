import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserTable from './components/UserTable';
import Login from './components/LoginPage';
import Register from './components/Register'; 
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('is_authenticated');
        setIsAuthenticated(auth === 'true');
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    {/* Redirect from root to either login, register, or UserTable based on authentication */}
                    <Route path="/" element={<Navigate replace to={isAuthenticated ? "/table" : "/login"} />} />
                    
                    {/* Route for Login page */}
                    <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate replace to="/table" />} />

                    {/* Route for Register page */}
                    <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate replace to="/table" />} />

                    {/* Route for UserTable */}
                    <Route path="/table" element={isAuthenticated ? <UserTable /> : <Navigate replace to="/login" />} />
                </Routes>
                {isAuthenticated && (
                   <h1 style={{  textAlign: 'center' }}> <button onClick={() => {
                    localStorage.removeItem('is_authenticated');
                    setIsAuthenticated(false);
                }}>Logout</button></h1>
                )}
            </div>
        </Router>
    );
};

export default App;
