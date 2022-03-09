import './App.css';
import './assets/styles/style.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';


const HoTel = React.lazy(() => import("./features/Hotel/index.jsx"));
const Auth = React.lazy(() => import("./features/Auth/index.jsx"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route index path='/*' element={<HoTel />} />
            <Route path='/auth/*' element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
