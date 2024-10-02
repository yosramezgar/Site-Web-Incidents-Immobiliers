const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const habitantRoutes = require('./routes/habitantRoutes');
const technicienRoutes = require('./routes/technicienRoutes');
const reclamationRoutes = require('./routes/reclamationRoutes');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/habitant', habitantRoutes);
app.use('/api/technicien', technicienRoutes);
app.use('/api/reclamation', reclamationRoutes);


mongoose.connect("mongodb+srv://yosramezgar0:yosrapfa@cluster3.ygokok4.mongodb.net/pfa?retryWrites=true&w=majority&appName=Cluster3", {})
  .then(() => {
    console.log('Connexion à la base de données établie');
  })
  .catch((err) => {
    console.log('Erreur lors de la connexion à la base de données');
  });


app.listen(5000, () => {
  console.log('Serveur en marche sur le port 5000');
});


