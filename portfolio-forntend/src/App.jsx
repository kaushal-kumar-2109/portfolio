import { Routes, Route } from 'react-router-dom'
import './styles/main.css'
import './styles/responsive.css'
import Home from './pages/Home'
import PortfolioDetails from './pages/PortfolioDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio-details" element={<PortfolioDetails />} />
    </Routes>
  )
}

export default App
