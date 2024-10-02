import React from 'react';
import { Link } from 'react-router-dom';
import './admin.css'; 

const Admin = () => {
  return (
    <div className="admin-container">
      <header>
        <h1>Tableau de bord Admin</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/admin/AfficherHabitants">Gérer les comptes habitants</Link>
          </li>
          <li>
            <Link to="/admin/AfficherTechniciens">Gérer les comptes techniciens</Link>
          </li>
          <li>
            <Link to="/admin/reclamations">Consulter les réclamations</Link>
          </li>
         
          <li>
            <Link to="/logout">Se déconnecter</Link>
          </li>
        </ul>
      </nav>
      <main>
      </main>
    </div>
  );
};

export default Admin;
