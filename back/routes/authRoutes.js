const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const AdminModel = require('../models/adminModel');
const habitantModel = require('../models/habitantModel'); 
const technicienModel = require('../models/technicienModel'); 

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email, password });
    if (admin) {
      let accesstoken = createAccessToken({ id: admin._id, role: 'admin' });
      res.status(200).json({ role: 'admin', accesstoken });
      return;
    }

    const habitant = await habitantModel.findOne({ email, password });
    if (habitant) {
      let accesstoken = createAccessToken({ id: habitant._id, role: 'habitant' });
      res.status(200).json({ role: 'habitant', accesstoken, habitantId: habitant._id });
      return;
    }

    const technicien = await technicienModel.findOne({ email, password });
    if (technicien) {
      let accesstoken = createAccessToken({ id: technicien._id, role: 'technicien' });
      res.status(200).json({ role: 'technicien', accesstoken });
      return;
    }

    res.status(401).json({ message: 'Identifiants incorrects' });
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    res.status(500).json({ message: 'Erreur lors de l\'authentification' });
  }
});

let createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.sendStatus(401); 
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); 
      }
      return res.sendStatus(200); 
    });
  } catch (error) {
    return res.sendStatus(500); 
  }
});


module.exports = router;
