import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './components/Dashboard';
import AddAlumni from './components/AddAlumni';
import { ToastContainer } from 'react-toastify';
import PlanMeet from './components/PlanMeet';
import StudentPanel from './pages/studentPanel';
import Home from './studentPanel component/Home';
import Talks from './studentPanel component/Talks';


function App() {
  return (<>
  
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPanel />}>
          <Route index  element={<Dashboard />} />
          <Route path='add-alumni'  element={<AddAlumni />} />
          <Route path='plan-meet'  element={<PlanMeet />} />
        </Route>
        <Route path="/" element={<StudentPanel/>} >
          <Route index element={<Home />} />
          <Route path='talks' element={<Talks />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </>
  );
}

export default App;
