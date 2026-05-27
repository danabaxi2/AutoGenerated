import { HashRouter, Routes, Route } from 'react-router-dom'
import OpeningScreen from './pages/OpeningScreen'
import TimelineScreen from './pages/TimelineScreen'
import TheArchiveMain from './pages/TheArchiveMain'
import ThePlotGenie from './pages/ThePlotGenie'
import ThePlotGenieInteractive from './pages/ThePlotGenieInteractive'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<OpeningScreen />} />
        <Route path="/timeline" element={<TimelineScreen />} />
        <Route path="/archive" element={<TheArchiveMain />} />
        <Route path="/plot-genie" element={<ThePlotGenie />} />
        <Route path="/plot-genie-interactive" element={<ThePlotGenieInteractive />} />
      </Routes>
    </HashRouter>
  )
}
