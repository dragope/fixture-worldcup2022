import React from 'react';
import './App.css';
import FixtureContextProvider from './context/fixtureContext';
import Fixture from './components/Fixture';
import Authentication from './components/Authentication';
import AuthContextProvider from './context/AuthContext'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import ProtectedRoute from './protected-route/ProtectedRoute';
import UserProfile from './components/UserProfile';
import Menu from './components/Menu';

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
                <Route
                  path='/profile'
                  element={
                    <ProtectedRoute>
                      <Menu />
                      <UserProfile/>
                    </ProtectedRoute>
                  }
                />
              </Routes>
              </BrowserRouter>
            </FixtureContextProvider>
          </AuthContextProvider>
    </div>
  )
}

export default App;