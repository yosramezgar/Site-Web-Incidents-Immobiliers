import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './habitants.css';

const Reclamations = () => {
  const [reclamations, setReclamations] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [technicienId, setTechnicienId] = useState('');
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [error, setError] = useState('');
  const [reclamationAssigned, setReclamationAssigned] = useState({});

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reclamation/all');
        const data = response.data;
        if (data.success) {
          const updatedReclamations = data.reclamations.map(reclamation => ({
            ...reclamation,
            reclamationAssigned: reclamation.etat === 'Affectée',
          }));
          setReclamations(updatedReclamations);
        } else {
          setError('Erreur lors de la récupération des réclamations : ' + data.message);
        }
      } catch (error) {
        setError('Erreur lors de la récupération des réclamations : ' + error.message);
      }
    };

    const fetchTechniciens = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/technicien/all');
        const data = response.data;
        if (data.length > 0) {
          setTechniciens(data);
        } else {
          setError('Aucun technicien trouvé.');
        }
      } catch (error) {
        setError('Erreur lors de la récupération des techniciens : ' + error.message);
      }
    };

    fetchReclamations();
    fetchTechniciens();
  }, []);

  const handleAssign = (reclamation) => {
    setSelectedReclamation(reclamation);
    setShowAssignForm(true);
    setError('');
  };
  const handleSubmitAssign = async () => {
    try {
      const technicien = techniciens.find((tech) => tech._id === technicienId);
      console.log(technicien,"aaa");
      if (technicien) {
        const response = await axios.put(`http://localhost:5000/api/reclamation/${selectedReclamation._id}`, {
          technicienId: technicienId,
          technicienNom: technicien.nom,
        });
        const data = response.data;
        if (data.success) {
          alert(`La réclamation "${selectedReclamation.titre}" a été affectée avec succès au technicien "${technicien.nom}".`);
          setSelectedReclamation(null);
          setTechnicienId('');
          setShowAssignForm(false);
          setReclamationAssigned(prevState => ({
            ...prevState,
            [selectedReclamation._id]: true
          }));
          window.location.reload();
        } else {
          setError(data.message);
        }
      } else {
        setError('Impossible de trouver le technicien.');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de l\'affectation de la réclamation : ' + error.message);
    }
  };


  return (
    <div className="container mt-4 w-100">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="mb-4">Réclamations</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Statut</th>
            <th scope="col">Habitant</th>
            <th scope="col">Affecter</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {reclamations
            .filter(reclamation => reclamation.statut === 'En cours de traitement')
            .map((reclamation, index) => (
              <tr key={index}>
                <td>{reclamation.titre}</td>
                <td>{reclamation.description}</td>
                <td>{new Date(reclamation.date).toLocaleDateString()}</td>
                <td>{reclamation.statut}</td>
                <td>{reclamation.habitantId?.nom || 'Nom non disponible'}</td>
                <td>
                  <button
                    className="btn btn-custom-success"
                    onClick={() => handleAssign(reclamation)}
                    disabled={reclamation.reclamationAssigned}
                  >
                    Affecter
                  </button>
                </td>
                <td>
                  {showAssignForm && selectedReclamation && selectedReclamation._id === reclamation._id && (
                    <div className="d-flex align-items-center">
                      <select
                        className="form-select"
                        value={technicienId}
                        onChange={(e) => setTechnicienId(e.target.value)}
                      >
                        <option value="">Sélectionner un technicien</option>
                        {techniciens.map((technicien) => (
                          <option key={technicien._id} value={technicien._id}>
                            {technicien.nom}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn btn-info ms-2"
                        onClick={handleSubmitAssign}
                      >
                        Envoyer
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reclamations;
