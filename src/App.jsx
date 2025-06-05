import AnimeItem from './Components/AnimeItem';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import AnimeEpisode from './Components/AnimeEpisode';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/anime/:id/:title/:ep/:episodes" element={<AnimeEpisode />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App