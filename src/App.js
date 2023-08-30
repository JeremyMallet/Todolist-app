import './index.css';
import Header from './components/Header/Header';
import TaskContainer from './components/TaskContainer/TaskContainer';
import React, { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { checkAuthState } from './components/firebaseConfig';
import { logoutUser } from './components/firebaseConfig';

function App() {
    // On tente de récupérer les tâches sauvegardées dans le local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    
    // Si savedTasks est null (c'est-à-dire qu'il n'y a rien dans le local storage), 
    // alors on initialise avec une liste de tâches par défaut, sinon on utilise savedTasks.
    const [tasks, setTasks] = useState(savedTasks || [
        { id: 1, title: 'Apprendre React' },
        { id: 2, title: 'Faire les courses' },
    ]);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = checkAuthState((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Nettoyage de l'effet 
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    return (
        <div className="App">
            <Header />
            <TaskContainer tasks={tasks} setTasks={setTasks} />
            {!user && <SignUp />}
            {!user && <Login />}
            {user && <div>
                <p>Bonjour, {user.email}</p>
                <button onClick={handleLogout}>Se déconnecter</button>
            </div>}
        </div>
    );
}

export default App;
