import "./index.css";
import { Search } from "./components/Search";
import { Routes, Route } from "react-router-dom";
import FilmDetail from "./components/FilmDetail";
function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/film/:objectID" element={<FilmDetail />} />
      </Routes>
    </div>
  );
}

export default App;
