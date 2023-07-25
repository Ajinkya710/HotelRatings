import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import RestaurantDetail from './routes/RestaurantDetail';
import UpdatePage from './routes/UpdatePage';
import {RestaurantsContextProvider} from './context/RestaurantsContext';

const App = () => {
  return (
    <RestaurantsContextProvider>
    <div className="container">
      <Router>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/restaurants/:id' Component={RestaurantDetail} />
          <Route exact path='/restaurants/:id/update' Component={UpdatePage} />
        </Routes>
      </Router>
    </div>
    </RestaurantsContextProvider>
  )
}

export default App

