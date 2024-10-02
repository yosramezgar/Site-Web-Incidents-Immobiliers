import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './habitants.css'; 

const AfficherHabitants = () => {
  const [habitants, setHabitants] = useState([]);

  useEffect(() => {
    const fetchHabitants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/habitant/habitants');
        setHabitants(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des habitants :', error);
      }
    };
    fetchHabitants();
  }, []);

  const handleDelete = async (id) => {
    try {

      const response = await axios.get(`http://localhost:5000/api/reclamation/byHabitant/${id}`);
      const reclamations = response.data.reclamations;

      if (reclamations.length > 0) {
        const confirmDelete = window.confirm("Il existe des réclamations associées à cet habitant. Voulez-vous vraiment supprimer cet habitant et ses réclamations ?");
        if (!confirmDelete) {
          return; 
        }
      }
  

      await Promise.all(reclamations.map(reclamation => axios.delete(`http://localhost:5000/api/reclamation/${reclamation._id}`)));
  

      await axios.delete(`http://localhost:5000/api/habitant/habitants/${id}`);
  

      setHabitants(habitants.filter((habitant) => habitant._id !== id));
      

      toast.success('Habitant supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'habitant :', error);
      toast.error('Erreur lors de la suppression de l\'habitant');
    }
  };
  
  

  const handleUpdate = async (id, updatedHabitant) => {
    try {
      await axios.put(`http://localhost:5000/api/habitant/habitants/${id}`, updatedHabitant);
      console.log('Habitant mis à jour avec succès!');
      toast.success('Habitant mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'habitant :', error);
      toast.error('Erreur lors de la mise à jour de l\'habitant');
    }
  };

  const handleChange = (id, field, value) => {
    const updatedHabitants = habitants.map((habitant) => {
      if (habitant._id === id) {
        return { ...habitant, [field]: value };
      }
      return habitant;
    });
    setHabitants(updatedHabitants);
  };

  const handleAdd = () => {
    window.location.href = 'http://localhost:5173/admin/habitants';
  };

  return (
    <div className="container w-100">
      <h2 className="card-title">Liste des habitants</h2>
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
          {habitants.map((habitant) => (
            <tr key={habitant._id}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={habitant.nom}
                  onChange={(e) => handleChange(habitant._id, 'nom', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={habitant.prenom}
                  onChange={(e) => handleChange(habitant._id, 'prenom', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={habitant.email}
                  onChange={(e) => handleChange(habitant._id, 'email', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={habitant.password}
                  onChange={(e) => handleChange(habitant._id, 'password', e.target.value)}
                />
              </td>
              <td>
                <div className="btn-group" role="group">
                  <button className="btn btn-custom-primary" onClick={() => handleUpdate(habitant._id, habitant)}>
                    Modifier
                  </button>
                  <button className="btn btn-custom-danger" onClick={() => handleDelete(habitant._id)}>
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

export default AfficherHabitants;
