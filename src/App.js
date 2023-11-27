import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageGenerator from './components/ImageGenerator/ImageGenerator';
import ComicDisplayPage from './components/ImageGenerator/ComicDisplayPage';
function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<ImageGenerator />} />
                <Route
                    path="/comic-display"
                    element={<ComicDisplayPage />}
                />
            </Routes>
        </Router>
  );
}

export default App;
