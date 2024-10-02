import React from 'react';
import { Link } from 'react-router-dom';
import './habitants.css'; // Import du fichier CSS

const HomeTechnicien = () => {
  return (
    <div className="container">
      <h1 className="mb-5">Bienvenue sur la page d'accueil des techniciens</h1>
      <Link to="/ListesPannes" className="btn btn-info">
        Consulter les réclamations affectées
      </Link>
      <Link to="/logout" className="btn btn-danger" style={{ marginLeft: '10px' }}>
        Se déconnecter
      </Link>
    </div>
  );
};

export default HomeTechnicien;
