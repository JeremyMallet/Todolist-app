import React from 'react';
import './TaskContainer.css';

function TaskContainer() {
    return (
        <div className="task-container">
            <div className="box task">
                <p className="task-title">Apprendre React</p>
            </div>
            <div className="box task">
                <p className="task-title">Faire les courses</p>
            </div>
        </div>
    );
}

export default TaskContainer;
