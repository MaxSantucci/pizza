import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NotFoundBlock from './components/NotFoundBlock';
import Cart from './pages/Cart';
import Home from './pages/Home';

import './scss/app.scss';

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundBlock />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
