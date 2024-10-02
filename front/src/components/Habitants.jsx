import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import './habitants.css'; // Import du fichier CSS

const Habitants = () => {
  const [habitant, setHabitant] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('http://localhost:5000/api/habitant/register', habitant);
      console.log('Habitant créé avec succès!');
      toast.success('Habitant créé avec succès!');
      setTimeout(() => {
        window.location.href = 'http://localhost:5173/admin/AfficherHabitants'; 
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la création de l\'habitant:', error);
      toast.error('Erreur lors de la création de l\'habitant');
    }
  };

  return (
    <div className="container">
      <ToastContainer /> 
      <header>
        <h3 className="card-title">Inscription</h3>
      </header>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nom" className="form-label d-flex align-items-center">
                  <FaUser className="mr-2" />
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  name="nom"
                  value={habitant.nom}
                  onChange={(e) => setHabitant({ ...habitant, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="prenom" className="form-label d-flex align-items-center">
                  <FaUser className="mr-2" />
                  Prénom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  name="prenom"
                  value={habitant.prenom}
                  onChange={(e) => setHabitant({ ...habitant, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email" className="form-label d-flex align-items-center">
                  <FaEnvelope className="mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={habitant.email}
                  onChange={(e) => setHabitant({ ...habitant, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password" className="form-label d-flex align-items-center">
                  <FaLock className="mr-2" />
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={habitant.password}
                  onChange={(e) => setHabitant({ ...habitant, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn-custom-success btn-block mt-3">
            Inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Habitants;
