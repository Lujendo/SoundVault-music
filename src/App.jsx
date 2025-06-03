import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Publishers from './pages/Publishers'
import Labels from './pages/Labels'
import Artists from './pages/Artists'
import Recordings from './pages/Recordings'
import Releases from './pages/Releases'
import './App.css'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/library" element={<Dashboard />} />
          <Route path="/publishers" element={<Publishers />} />
          <Route path="/labels" element={<Labels />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/recordings" element={<Recordings />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/royalties" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
