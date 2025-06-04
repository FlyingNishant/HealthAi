import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import {Signup, Login, Dashboard, VerifyUser, Prediction} from './pages'
import AuthLayout from './layouts/AuthLayout'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path='/login' element={
              <AuthLayout authentication={false}>
                <Login/>
              </AuthLayout>
              }/> 
            <Route path='/signup' element={
                <AuthLayout authentication={false}>
                  <Signup/>
                </AuthLayout>
            }/>
            <Route path='/verify' element={
                <AuthLayout authentication={false}>
                  <VerifyUser/>
                </AuthLayout>
            }/>
            <Route path='/' element={
              <AuthLayout authentication={true}>
                  <Dashboard/>
              </AuthLayout>
            }/>
            <Route path='/prediction/:patientId' element={
              <AuthLayout authentication={true}>
                  <Prediction/>
              </AuthLayout>
            }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
