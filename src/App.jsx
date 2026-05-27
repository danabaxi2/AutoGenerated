import { HashRouter, Routes, Route } from 'react-router-dom'
import OpeningScreen from './pages/OpeningScreen'
import TimelineScreen from './pages/TimelineScreen'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<OpeningScreen />} />
        <Route path="/timeline" element={<TimelineScreen />} />
      </Routes>
    </HashRouter>
  )
}
