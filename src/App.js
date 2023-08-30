import React from 'react';
import './index.css';
import Header from './components/Header/Header';
import TaskContainer from './components/TaskContainer/TaskContainer';

function App() {
    return (
        <div className="App">
            <Header />
            <TaskContainer />
        </div>
    );
}

export default App;