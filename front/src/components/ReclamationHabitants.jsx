import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'; 
import './habitants.css'; 

const ReclamationHabitants = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const habitantId = localStorage.getItem('habitantId');

    try {
      const nouvelleReclamation = {
        titre: titre,
        description: description,
        habitantId: habitantId,
      };

      const response = await axios.post('http://localhost:5000/api/reclamation/create', nouvelleReclamation);
      const data = response.data;

      if (data.success) {
        toast.success('Votre réclamation a été soumise avec succès !');
        setTitre('');
        setDescription('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de la réclamation :', error);
      toast.error('Une erreur est survenue lors de la soumission de votre réclamation. Veuillez réessayer.');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-5">Déclarer une reclamation</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titre" className="form-label">Titre du problème:</label>
          <input
            type="text"
            className="form-control"
            id="titre"
            name="titre"
            value={titre}
            onChange={(event) => setTitre(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description du problème:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-info">Soumettre</button>
          <Link to="/logout" className="btn btn-danger">Se déconnecter</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ReclamationHabitants;
