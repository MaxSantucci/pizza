import { Route, Routes } from 'react-router-dom';

import NotFoundBlock from './components/NotFoundBlock';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';

import './scss/app.scss';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
}

export default App;
