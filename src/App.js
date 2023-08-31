import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import TaskContainer from './components/TaskContainer/TaskContainer';
import PrivateRoute from './components/PrivateRoute';
import { logoutUser } from './firebaseConfig';
import AuthContext from './contexts/AuthContext';
import { auth } from './firebaseConfig';

function App() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const [tasks, setTasks] = useState(savedTasks);
    const [user, setUser] = useState(null);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
    
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={user}>
            <Router>
                <Header user={user} onLogout={handleLogout} />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <TaskContainer tasks={tasks} setTasks={setTasks} />
                        </PrivateRoute>
                    } />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
