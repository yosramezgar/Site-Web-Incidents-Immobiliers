const express = require('express');
const habitantModel = require('../models/habitantModel');
const ReclamationModel = require('../models/reclamationModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const habitant = new habitantModel(req.body);
    await habitant.save();
    console.log("idhabitant :", habitant._id);
    res.status(201).json({ habitantId: habitant._id, message: 'Habitant créé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erreur lors de la création de habitant' });
  }
});



router.get('/habitants', async (req, res) => {
  try {
    const habitants = await habitantModel.find();
    res.status(200).json(habitants);
  } catch (error) {
    console.error('Erreur lors de la récupération des habitants :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des habitants' });
  }
});


router.put('/habitants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHabitant = await habitantModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedHabitant);
  } catch (error) {
    console.error('Erreur lors de la modification de l\'habitant :', error);
    res.status(400).json({ error: 'Erreur lors de la modification de l\'habitant' });
  }
});

router.delete('/habitants/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const reclamations = await ReclamationModel.find({ habitantId: id });
    if (reclamations.length > 0) {

      await Promise.all(reclamations.map(reclamation => reclamation.remove()));
    }
 
    await habitantModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Habitant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'habitant :', error);
    res.status(400).json({ error: 'Erreur lors de la suppression de l\'habitant' });
  }
});


router.get('/:habitantId', async (req, res) => {
  try {
    const habitant = await habitantModel.findById(req.params.habitantId);
    res.status(200).json({ success: true, habitant });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'habitant :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des détails de l\'habitant' });
  }
});

module.exports = router;

