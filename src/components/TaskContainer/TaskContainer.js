import React, { useState } from 'react';
import './TaskContainer.css';

function TaskContainer({ tasks, setTasks }) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newTaskTitle.trim() === '') return;

        const newTask = {
          id: Date.now(),
          title: newTaskTitle,
          status: 'todo'
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setNewTaskTitle('');
    }

    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const toggleEdit = (id, title) => {
        if (editingId === id) {
            setEditingId(null);
            setEditTitle('');
        } else {
            setEditingId(id);
            setEditTitle(title);
        }
    };

    const handleSave = (id) => {
        const updatedTasks = tasks.map((task) => 
          task.id === id ? {...task, title: editTitle} : task
        );

        setTasks(updatedTasks);
        setEditingId(null);
        setEditTitle('');
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleComplete = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, status: task.status === 'todo' ? 'done' : 'todo' } : task
        );
        
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
                    <div key={task.id} className={`box task ${task.status}`}> {/* Utilisation des backticks */}
                        {editingId === task.id ? (
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        ) : (
                            <p className="task-title">{task.title}</p>
                        )}
            
                        {editingId === task.id ? (
                            <>
                                <button onClick={() => handleSave(task.id)}>Sauvegarder</button>
                                <button onClick={() => toggleEdit(null)}>Annuler</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => toggleEdit(task.id, task.title)}>Modifier</button>
                                <button onClick={() => handleDelete(task.id)}>Supprimer</button>
                                <button onClick={() => handleComplete(task.id)}>
                                    {task.status === 'todo' ? 'Terminer' : 'Rétablir'}
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </> 
    );
}

export default TaskContainer;
