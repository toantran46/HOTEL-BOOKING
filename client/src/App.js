import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';

const HoTel = React.lazy(() => import("./features/Hotel/index.jsx"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route index path='/*' element={<HoTel />} />
            <Route path='/auth' element={<div>Auth</div>} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
