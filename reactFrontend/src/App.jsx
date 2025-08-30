import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './components/Dashboard';
import AddAlumni from './components/AddAlumni';
import { ToastContainer } from 'react-toastify';
import PlanMeet from './components/PlanMeet';


function App() {
  return (<>
  
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPanel />}>
          <Route index  element={<Dashboard />} />
          <Route path='add-alumni'  element={<AddAlumni />} />
          <Route path='plan-meet'  element={<PlanMeet />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </>
  );
}

export default App;
