import React, { useState } from 'react';
import './TaskContainer.css';

function TaskContainer({ tasks, setTasks }) {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newTaskTitle.trim() === '') return; // Evite l'ajout de tâches vides
        
        const newTask = {
          id: Date.now(), // Utilise le timestamp comme ID unique
          title: newTaskTitle
        };
      
        setTasks([...tasks, newTask]); // Ajoute la nouvelle tâche à la liste
        setNewTaskTitle(''); // Réinitialise l'input
      }

    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <> 
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nouvelle tâche"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button type="submit">Ajouter</button>
            </form>
            <div className="task-container">
                {tasks.map((task) => (
                    <div key={task.id} className="box task">
                        <p className="task-title">{task.title}</p>
                        <button onClick={() => handleDelete(task.id)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </> 
    );
}

export default TaskContainer;