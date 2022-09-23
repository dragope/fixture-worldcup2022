import React from 'react';
import './App.css';
import FixtureContextProvider from './context/fixtureContext';
import Fixture from './components/Fixture';
import Authentication from './components/Authentication';
import AuthContextProvider from './context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './protected-route/ProtectedRoute';

function App() {

  return (
    <div className="App">
          <AuthContextProvider>
            <FixtureContextProvider>
              <BrowserRouter>
              <Routes>
                <Route 
                  path='/'
                  element={
                    <ProtectedRoute>
                      <Fixture />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path='/authentication'
                  element={<Authentication />}
                />
              </Routes>
              </BrowserRouter>
            </FixtureContextProvider>
          </AuthContextProvider>
    </div>
  )
}

export default App;