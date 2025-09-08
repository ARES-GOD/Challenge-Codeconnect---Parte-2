import { useState } from 'react'
//import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Authentication from './components/Authentication'
import Feed from './pages/Feed'
import Share from './pages/Share'
import BarraLateral from './components/BarraLateral/BarraLateral'
import styled from 'styled-components'
import Perfil from './pages/Perfil'
import SobreNosotros from './pages/SobreNosotros'

const MainContainer = styled.main`
  display: flex;
  gap:24px;
`

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Authentication onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <MainContainer>
        <BarraLateral />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {/* <Route path='/authentication' element={<Authentication />}></Route> */}
          <Route path='/feed' element={<Feed />}></Route>
          <Route path='/share' element={<Share />}></Route>
          <Route path='/perfil' element={<Perfil />}></Route>
          <Route path='/sobreNosotros' element={<SobreNosotros />}></Route>
        </Routes>
      </MainContainer>


    </div>
  )
}

export default App
