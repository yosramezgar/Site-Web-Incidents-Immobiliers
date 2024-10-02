
const express = require('express');
const ReclamationModel = require('../models/reclamationModel');
const TechnicienModel = require('../models/technicienModel');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { titre, description } = req.body;
    const habitantId = req.body.habitantId;
    const technicienId = req.body.technicienId; 
    const nouvelleReclamation = new ReclamationModel({
      titre,
      description,
      habitantId,
      technicienId,
    });
    await nouvelleReclamation.save();
    res.status(201).json({ success: true, message: 'Réclamation créée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de la réclamation :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la création de la réclamation' });
  }
});





router.get('/all', async (req, res) => {
  try {
    const reclamations = await ReclamationModel.find().populate('habitantId', 'nom'); 
    res.status(200).json({ success: true, reclamations });
  } catch (error) {
    console.error('Erreur lors de la récupération des réclamations :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des réclamations' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { technicienId, technicienNom } = req.body;
    const reclamation = await ReclamationModel.findById(id);
    if (!reclamation) {
      return res.status(404).json({ success: false, message: 'Réclamation non trouvée' });
    }
    reclamation.technicienId = technicienId;
    reclamation.technicienNom = technicienNom;
    reclamation.etat = 'Affectée';
    await reclamation.save();

    res.status(200).json({ success: true, message: 'Réclamation mise à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réclamation :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de la réclamation' });
  }
});

router.put('/updateStatus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body; 
    const reclamation = await ReclamationModel.findById(id);
    if (!reclamation) {
      return res.status(404).json({ success: false, message: 'Réclamation non trouvée' });
    }
    reclamation.statut = statut; 
    await reclamation.save();

    res.status(200).json({ success: true, message: 'Statut de la réclamation mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la réclamation :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du statut de la réclamation' });
  }
});
router.put('/updateEtatAndTechnicien/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID de la réclamation à mettre à jour :', id);

    const { etat, technicienId } = req.body;
    console.log('Nouvel état de la réclamation :', etat);
    console.log('Nouvel ID du technicien de la réclamation :', technicienId);

    const reclamation = await ReclamationModel.findById(id);
    if (!reclamation) {
      console.log('Réclamation non trouvée.');
      return res.status(404).json({ success: false, message: 'Réclamation non trouvée' });
    }

  
    reclamation.etat = etat;
    reclamation.technicienId = technicienId;
    await reclamation.save();
    console.log('État de la réclamation mis à jour avec succès.');

    res.status(200).json({ success: true, message: 'État de la réclamation mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'état de la réclamation :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'état de la réclamation' });
  }
});



router.get('/byHabitant/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Rechercher toutes les réclamations associées à l'habitant avec l'ID spécifié
    const reclamations = await ReclamationModel.find({ habitantId: id });
    res.status(200).json({ success: true, reclamations });
  } catch (error) {
    console.error('Erreur lors de la récupération des réclamations par habitant :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des réclamations par habitant' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Supprimer la réclamation avec l'ID spécifié
    await ReclamationModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Réclamation supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la réclamation :', error);
    res.status(400).json({ success: false, message: 'Erreur lors de la suppression de la réclamation' });
  }
});



router.delete('/reclamationsTerminer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID du technicien à supprimer :', id);


    const technicien = await TechnicienModel.findById(id);
    console.log('Technicien à supprimer :', technicien);
    
    if (!technicien) {
      return res.status(404).json({ success: false, message: 'Technicien non trouvé' });
    }

 
    const reclamations = await ReclamationModel.find({ technicienId: id });
    console.log('Réclamations associées au technicien :', reclamations);


    const reclamationsEnCours = reclamations.filter(reclamation => reclamation.statut === 'En cours de traitement');
    console.log('Réclamations en cours de traitement :', reclamationsEnCours);

    const reclamationsNonEnCours = reclamations.filter(reclamation => reclamation.statut !== 'En cours de traitement');

   
    await Promise.all(
      reclamationsEnCours.map(async (reclamation) => {
        reclamation.etat = 'Non affecté';
        reclamation.technicienId = null; 
        await reclamation.save();
       
      })
    );

 
await Promise.all(
  reclamationsNonEnCours.map(async (reclamation) => {
    if (reclamation.statut !== 'En cours de traitement') {
      console.log('Suppression de la réclamation qui n\'est pas en cours de traitement :', reclamation);
      await ReclamationModel.findByIdAndDelete(reclamation._id);
    }
  })
);


    
    await TechnicienModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Technicien et réclamations associées supprimés avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du technicien et de ses réclamations associées :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du technicien et de ses réclamations associées' });
  }
});



module.exports = router;

