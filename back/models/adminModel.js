const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'habitant', 'technicien'], required: true } 
});

const AdminModel = mongoose.model('Admin', adminSchema);
module.exports = AdminModel;
