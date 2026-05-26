import { HashRouter, Routes, Route } from 'react-router-dom'
import TheArchiveMain from './pages/TheArchiveMain'
import ThePlotGenie from './pages/ThePlotGenie'
import ThePlotGenieInteractive from './pages/ThePlotGenieInteractive'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<TheArchiveMain />} />
        <Route path="/plot-genie" element={<ThePlotGenie />} />
        <Route path="/plot-genie-interactive" element={<ThePlotGenieInteractive />} />
      </Routes>
    </HashRouter>
  )
}
