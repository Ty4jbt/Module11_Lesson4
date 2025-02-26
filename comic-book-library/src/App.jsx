import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import BrowseCharacters from './components/BrowseCharacters'
import CharacterDetails from './components/CharacterDetails'
import Comics from './components/Comics'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'


function App() {

  return (
    <div className="App">
      <NavBar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<BrowseCharacters />} />
          <Route path="/characters/:characterId" element={<CharacterDetails />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
