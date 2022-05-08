import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {GetStarted} from './containers/GetStarted'
import {Learning} from "./containers/Learninig";
import {Test} from './containers/Test'

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<GetStarted />} />
                <Route path="test/:id" element={<Test />} />
                <Route path="learn/:id" element={<Learning />} />
                <Route path="*" element={<GetStarted />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
