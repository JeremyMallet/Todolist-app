import React, { useState } from 'react';
import './TaskContainer.css';

function TaskContainer({ tasks, setTasks }) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Personnel');
    const [filteredCategory, setFilteredCategory] = useState('Tout');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newTaskTitle.trim() === '') return;

        const newTask = {
          id: Date.now(),
          title: newTaskTitle,
          status: 'todo',
          category: selectedCategory
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

                {/* Sélecteur de catégorie pour l'ajout de nouvelle tâche */}
                <div>
                    <label>Catégorie: </label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="Personnel">Personnel</option>
                        <option value="Professionnel">Professionnel</option>
                        <option value="Courses">Courses</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>

                <button type="submit">Ajouter</button>
            </form>

            {/* Sélecteur pour filtrer les tâches par catégorie */}
            <div className="filter-container">
                <label>Filtrer par catégorie: </label>
                <select value={filteredCategory} onChange={(e) => setFilteredCategory(e.target.value)}>
                    <option value="Tout">Tout</option>
                    <option value="Personnel">Personnel</option>
                    <option value="Professionnel">Professionnel</option>
                    <option value="Courses">Courses</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>
            <div className="task-container">
                {tasks.filter(task => filteredCategory === 'Tout' || task.category === filteredCategory).map((task) => (
                    <div key={task.id} className={`box task ${task.status}`}> 
                        {editingId === task.id ? (
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        ) : (
                            <p className="task-title">{task.title} <span className="task-category">[{task.category}]</span></p>
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
