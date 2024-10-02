import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import './habitants.css'; 

const Techniciens = () => {


  const [technicien, setTechnicien] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/technicien/register', technicien);
      const technicienId = response.data.technicienId;
      console.log('Technicien créé avec succès!');
      toast.success('Technicien créé avec succès!');
      localStorage.setItem('technicienId', technicienId);
      console.log(technicienId, "test technicien Id");
      setTimeout(() => {
        window.location.href = 'http://localhost:5173/admin/AfficherTechniciens'; 
      }, 3000);
      
    } catch (error) {
      console.error('Erreur lors de la création du technicien:', error);
      toast.error('Erreur lors de la création du technicien'); 
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
                  value={technicien.nom}
                  onChange={(e) => setTechnicien({ ...technicien, [e.target.name]: e.target.value })}
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
                  value={technicien.prenom}
                  onChange={(e) => setTechnicien({ ...technicien, [e.target.name]: e.target.value })}
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
                  value={technicien.email}
                  onChange={(e) => setTechnicien({ ...technicien, [e.target.name]: e.target.value })}
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
                  value={technicien.password}
                  onChange={(e) => setTechnicien({ ...technicien, [e.target.name]: e.target.value })}
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

export default Techniciens;
