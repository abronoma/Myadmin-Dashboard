// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/App.css'
import PrimaryPageLayout from './components/Layout/Pagelayout.jsx';
import Dashboard from './Pages/DashBoard';
import AgroForestry from './Pages/Agroforestry';
// import Beekeeping from './pages/Beekeeping';
// import AwarenessRaising from './pages/AwarenessRaising';
// import ImprovementCooking from './pages/ImprovementCooking';
// import Reports from './pages/Reports';
// import Setting from './pages/Setting';

function App() {
  return (
    <Router>
      <div className='grid-container'>
      <Routes>
        <Route path="/" element={<PrimaryPageLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="agroforestry" element={<AgroForestry />} />
          {/* <Route path="beekeeping" element={<Beekeeping />} />
          <Route path="awareness-raising" element={<AwarenessRaising />} />
          <Route path="improvement-cooking" element={<ImprovementCooking />} />
          <Route path="reports" element={<Reports />} />
          <Route path="setting" element={<Setting />} /> */}
        </Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
