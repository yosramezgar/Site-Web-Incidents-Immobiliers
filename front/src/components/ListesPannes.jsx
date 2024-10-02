import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListesPannes = () => {
  const [reclamations, setReclamations] = useState([]);
  const token = localStorage.getItem('token'); 
  const [technicienId, setTechnicienId] = useState(localStorage.getItem('technicienId')); 


  const validerReclamation = async (reclamationId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/reclamation/updateStatus/${reclamationId}`, { statut: 'Terminée' });
      const data = response.data;
      if (data.success) {
        const updatedReclamations = reclamations.map(reclamation => {
          if (reclamation._id === reclamationId) {
            return { ...reclamation, statut: 'Terminée' };
          }
          return reclamation;
        });
        setReclamations(updatedReclamations);
      } else {
        console.error('Erreur lors de la validation de la réclamation :', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la validation de la réclamation :', error);
    }
  };
  


  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/technicien/reclamations`, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        if (data.success) {
          const reclamationsWithHabitantName = await Promise.all(data.reclamations.map(async (reclamation) => {
         
            return { ...reclamation };
          }));
          setReclamations(reclamationsWithHabitantName);
        } else {
          console.error('Erreur lors de la récupération des réclamations :', data.message);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des réclamations :', error);
      }
    };

    fetchReclamations();
  }, [technicienId]);

  return (
    <div>
      <h1>Liste des Pannes</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Statut</th>
            <th scope="col">Habitant</th>
            <th scope="col">Validation</th>
          </tr>
        </thead>
        <tbody>
          {reclamations.map((reclamation, index) => (
            <tr key={index}>
              <td>{reclamation.titre}</td>
              <td>{reclamation.description}</td>
              <td>{new Date(reclamation.date).toLocaleDateString()}</td>
              <td>{reclamation.statut}</td>
              <td>{reclamation.habitantId?.nom || 'Nom non disponible'}</td>
              <td>
                <button
                  onClick={() => validerReclamation(reclamation._id)}
                  className="btn btn-primary"
                  disabled={reclamation.statut === 'Terminée'}
                >
                  Valider
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListesPannes;
