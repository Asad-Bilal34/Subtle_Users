import React from 'react';
import './index.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ✅ Import your components
import Login from './assets/componentes/Login.jsx';
import UploadForm from './assets/componentes/UploadForm.jsx';
import AdminPanel from './assets/componentes/AdminPanel.jsx';

// ✅ Render with routes
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/upload" element={<UploadForm />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  </BrowserRouter>
);
