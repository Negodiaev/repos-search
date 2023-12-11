import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Navigation } from './components/Navigation';

import { Home } from './pages/Home';
import { Favourites } from './pages/Favourites';

function App(): JSX.Element {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  );
}

export default App;
