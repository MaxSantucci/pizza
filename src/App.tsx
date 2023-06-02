import Loadable from 'react-loadable';
import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = Loadable({
   loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
   loading: () => <div>Cart is loading...</div>,
});

const FullPizza = React.lazy(() =>
   import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza')
);
const NotFound = React.lazy(() =>
   import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
);

const App = () => {
   return (
      <Routes>
         <Route path="/" element={<Navigate to="/pizza" />}/>
         <Route path='/' element={<MainLayout />}>
            <Route path="/pizza" element={<Home />} />
            <Route path="/cart" element={
               <Suspense fallback={<div>Cart is loading...</div>}>
                  <Cart />
               </Suspense>
            } />
            <Route path="/pizza/:id" element={
               <Suspense fallback={<div>Loading in progress...</div>}>
                  <FullPizza />
               </Suspense>
            } />
            <Route path="/*" element={
               <Suspense fallback={<div>Loading in progress...</div>}>
                  <NotFound />
               </Suspense>
            } />
         </Route>
      </Routes>
   );
}

export default App;

