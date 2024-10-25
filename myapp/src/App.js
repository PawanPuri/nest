import React from 'react';
import Form from './components/Form';
import VCardTable from './components/VCardTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdentityCard from './components/IdentityCard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/details' element={<VCardTable />} />
          <Route path='/identity-card/:id' element={<IdentityCard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
