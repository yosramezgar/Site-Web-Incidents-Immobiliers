import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import Logout from './components/logout';
import Habitants from './components/Habitants';
import Techniciens from './components/Techniciens';
import ReclamationHabitants from './components/ReclamationHabitants';
import Reclamations from './components/Reclamations';
import HomeTechnicien from './components/HomeTechnicien';
import ListesPannes from './components/ListesPannes';
import AfficherHabitants from './components/AfficherHabitants';
import AfficherTechniciens from './components/AfficherTechniciens';

function App() {
  const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    console.log(isAuthenticated,"test");
    return isAuthenticated ? element : <Navigate to="/" />;
  };
  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
      <Route path="/admin/habitants" element={<PrivateRoute element={<Habitants />} />} />
      <Route path="/admin/techniciens" element={<PrivateRoute element={<Techniciens />} />} />
      <Route path="/ReclamationHabitants" element={<PrivateRoute element={<ReclamationHabitants />} />} />
      <Route path="/admin/reclamations" element={<PrivateRoute element={<Reclamations />} />} />
      <Route path="/HomeTechnicien" element={<PrivateRoute element={<HomeTechnicien />} />} />
      <Route path="/ListesPannes" element={<PrivateRoute element={<ListesPannes />} />} />
      <Route path="/admin/AfficherHabitants" element={<PrivateRoute element={<AfficherHabitants />} />} />
      <Route path="/admin/AfficherTechniciens" element={<PrivateRoute element={<AfficherTechniciens />} />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;


