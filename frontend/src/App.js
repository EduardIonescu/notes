import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Exercises from './components/Exercises';
import CreateExercise from './components/CreateExercise';


function App() {
  return (
    <Router>
      <Navbar />

      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/exercises'>
        <Exercises />
      </Route>
      <Route path='/create'>
        <CreateExercise />
      </Route>
    </Router>

  )

}

export default App;
