import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import {GetStarted} from './containers/GetStarted'
import {Learning} from "./containers/Learninig";
import {Test} from './containers/Test'
import {PageLayout} from "./containers/PageLayout";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/Susipazhinkime" element={<PageLayout />}>
                    <Route index element={<GetStarted />} />
                    <Route path="test/:id" element={<Test />} />
                    <Route path="learn/:id" element={<Learning />} />
                </Route>
                <Route path="*" element={<Navigate replace to="/Susipazhinkime" />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
