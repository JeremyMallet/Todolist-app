import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
 // Ajout pour la redirection

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); // Ajout pour le spinner
    const navigate = useNavigate(); // Ajout pour la redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("Tentative de connexion..."); // Ajout
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Connexion réussie !"); // Ajout
            navigate('/dashboard');
        } catch (err) {
            console.log("Erreur lors de la connexion :", err); // Ajout
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Se connecter</button>
            </form>
            {loading && <ClipLoader />} {/* Affichage du spinner si loading est vrai */}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
