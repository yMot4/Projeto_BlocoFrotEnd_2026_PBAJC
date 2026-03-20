import { useState } from 'react'
import Carrocel from './Componentes/Carroceis/Carrocel/Carrocel.jsx'
import CarrocelSlide from './Componentes/Carroceis/CarrocelSlide/CarrocelSlide.jsx'

import './App.css'

function App() {

  return (
    <>
      <Carrocel itens={10}/>    
      <CarrocelSlide itens={20} titulo='slide'/>      
    </>
  )
}

export default App
