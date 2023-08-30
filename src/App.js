import './index.css';
import Header from './components/Header/Header';
import TaskContainer from './components/TaskContainer/TaskContainer';
import React, { useState } from 'react';

function App() {
    const [tasks, setTasks] = useState([
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