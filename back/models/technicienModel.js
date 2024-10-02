const mongoose = require("mongoose");

const technicienSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const technicienModel = mongoose.model("Technicien", technicienSchema);
module.exports = technicienModel;
