const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  habitantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitant', 
  },
  technicienId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technicien', 
  },
  date: {
    type: Date,
    default: Date.now,
  },
  statut: {
    type: String,
    enum: ['En cours de traitement', 'Terminée'],
    default: 'En cours de traitement',
  },
  habitantNom: String, 
  technicienNom: String, 
  etat: {
    type: String,
    enum: ['Non affecté', 'Affectée'], 
    default: 'Non affecté', 
  },
});

const ReclamationModel = mongoose.model('Reclamation', reclamationSchema);
module.exports = ReclamationModel;
