import './index.css';
import Header from './components/Header/Header';
import TaskContainer from './components/TaskContainer/TaskContainer';
import React, { useState } from 'react';

function App() {
    // On tente de récupérer les tâches sauvegardées dans le local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    
    // Si savedTasks est null (c'est-à-dire qu'il n'y a rien dans le local storage), 
    // alors on initialise avec une liste de tâches par défaut, sinon on utilise savedTasks.
    const [tasks, setTasks] = useState(savedTasks || [
        { id: 1, title: 'Apprendre React' },
        { id: 2, title: 'Faire les courses' },
    ]);

    return (
        <div className="App">
            <Header />
            <TaskContainer tasks={tasks} setTasks={setTasks} />
        </div>
    );
}

export default App;
