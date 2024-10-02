const express = require('express');
const technicienModel = require('../models/technicienModel');
const ReclamationModel = require('../models/reclamationModel');
const auh_technicien = require('../midleware/auth');

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const techniciens = await technicienModel.find();
    res.status(200).json(techniciens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des techniciens' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const technicien = new technicienModel(req.body);
    await technicien.save();
    res.status(201).json({ technicienId: technicien._id, message: 'Technicien créé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erreur lors de la création de technicien' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTechnicien = await technicienModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTechnicien);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du technicien' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await technicienModel.findByIdAndDelete(id);
    await ReclamationModel.deleteMany({ technicienId: id });
    res.status(200).json({ message: 'Technicien supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du technicien' });
  }
});

router.get('/reclamations', auh_technicien.auh_technicien, async (req, res) => {
  try {
    let technicien = await technicienModel.findById(req.technicien.id);
    console.log(technicien);
    const reclamations = await ReclamationModel.find({ technicienId: technicien._id }).populate('habitantId', 'nom');
    res.status(200).json({ success: true, reclamations });
  } catch (error) {
    console.error('Erreur lors de la récupération des réclamations du technicien :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des réclamations du technicien' });
  }
});
router.get('/reclamations/:technicienId', async (req, res) => {
  try {
   
    const reclamations = await ReclamationModel.find({ technicienId: req.params.technicienId }).populate('habitantId', 'nom');
    console.log(req.params.technicienId);
    res.status(200).json({ success: true, reclamations });
  } catch (error) {
    console.error('Erreur lors de la récupération des réclamations du technicien :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des réclamations du technicien' });
  }
});


module.exports = router;
