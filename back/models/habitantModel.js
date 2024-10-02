const mongoose = require("mongoose");

const habitantSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const habitantModel = mongoose.model("Habitant", habitantSchema);
module.exports = habitantModel;
