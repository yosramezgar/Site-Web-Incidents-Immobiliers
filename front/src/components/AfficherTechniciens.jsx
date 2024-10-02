import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './habitants.css'; 

const AfficherTechniciens = () => {
  const [techniciens, setTechniciens] = useState([]);
  useEffect(() => {
    const fetchTechniciens = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/technicien/all');
        setTechniciens(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des techniciens :', error);
      }
    };
    fetchTechniciens();
  }, []);
  const handleDelete = async (id) => {
    try {

      const response = await axios.get(`http://localhost:5000/api/technicien/reclamations/${id}`);
      const reclamationsAssociees = response.data.reclamations;
  
      const reclamationsEnCours = reclamationsAssociees.filter(reclamation => reclamation.statut === 'En cours de traitement');
  

await Promise.all(
  reclamationsEnCours.map(async (reclamation) => {
    await axios.put(`http://localhost:5000/api/reclamation/updateEtatAndTechnicien/${reclamation._id}`, { etat: 'Non affecté', technicienId: null });
    console.log('Mise à jour de la réclamation en cours de traitement');
  })
);

  
   
      await axios.delete(`http://localhost:5000/api/technicien/${id}`);

      setTechniciens(prevTechniciens => prevTechniciens.filter((technicien) => technicien._id !== id));
  
      toast.success('Technicien supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression du technicien :', error);
      toast.error('Erreur lors de la suppression du technicien');
    }
  };
  
  
  
  



  const handleUpdate = async (id, updatedTechnicien) => {
    try {
      await axios.put(`http://localhost:5000/api/technicien/${id}`, updatedTechnicien);
      console.log('Technicien mis à jour avec succès!');
      toast.success('Technicien mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du technicien :', error);
      toast.error('Erreur lors de la mise à jour du technicien');
    }
  };

  const handleChange = (id, field, value) => {
    const updatedTechniciens = techniciens.map((technicien) => {
      if (technicien._id === id) {
        return { ...technicien, [field]: value };
      }
      return technicien;
    });
    setTechniciens(updatedTechniciens);
  };

  const handleAdd = () => {
    window.location.href = 'http://localhost:5173/admin/techniciens';
  };

  return (
    <div className="container">
      <h2 className="card-title">Liste des techniciens</h2>
      <ToastContainer />
      <button className="btn btn-custom-success mb-3" onClick={handleAdd}>Ajouter</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Email</th>
            <th scope="col">Mot de passe</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {techniciens.map((technicien) => (
            <tr key={technicien._id}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={technicien.nom}
                  onChange={(e) => handleChange(technicien._id, 'nom', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={technicien.prenom}
                  onChange={(e) => handleChange(technicien._id, 'prenom', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={technicien.email}
                  onChange={(e) => handleChange(technicien._id, 'email', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={technicien.password}
                  onChange={(e) => handleChange(technicien._id, 'password', e.target.value)}
                />
              </td>
              <td>
                <div className="btn-group" role="group">
                  <button className="btn btn-custom-primary" onClick={() => handleUpdate(technicien._id, technicien)}>
                    Modifier
                  </button>
                  <button className="btn btn-custom-danger" onClick={() => handleDelete(technicien._id)}>
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AfficherTechniciens;
