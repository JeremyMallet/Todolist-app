import React from 'react';
import './Header.css';  

function Header({ user, onLogout}) {
  return (
    <header className="header has-text-centered">
        <h1 className="title">Todo List</h1>
        {user && (
          <button onClick={onLogout}>Se déconnecter</button>
        )}
    </header>
  );
}

export default Header;
