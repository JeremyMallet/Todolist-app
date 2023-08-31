import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { ClipLoader } from 'react-spinners';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Ajout pour le spinner

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Début de la tentative d'inscription
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setLoading(false); // Fin de la tentative d'inscription
        } catch (err) {
            setError(err.message);
            setLoading(false); // En cas d'erreur
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
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
                <button type="submit">S'inscrire</button>
            </form>
            {loading && <ClipLoader />} {/* Affichage du spinner si loading est vrai */}
            {error && <p>{error}</p>}
        </div>
    );
}

export default SignUp;
