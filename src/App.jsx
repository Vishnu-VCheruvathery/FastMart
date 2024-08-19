import { Route, Routes } from 'react-router-dom'
import './App.css'
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Product from './pages/Product'
import Footer from './components/Footer'
import Form from './pages/Form'
import Add from './pages/Add'
import Cart from './pages/Cart'
import Cancel from './pages/Cancel'
import Stock from './pages/stock'




function App() {


  return (
    <>
     <Navbar /> 
     <Sidebar /> 
     <Toaster 
           position={window.innerWidth < 768 ? 'bottom-center' : 'bottom-right'}
          toastOptions={{duration: 5000}} />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path='/forms' element={<Form/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/cancel' element={<Cancel/>} />
      <Route path='/stock/:category' element={<Stock/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
