import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import About from "./components/About";
import SearchView from "./components/SearchView";
import { Routes, Route } from "react-router-dom";
import MovieView from "./components/MovieView";


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if(searchText) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=4ecacb09ef3a9e64901a9d05b6fff62e&language=en-US&query=${searchText}&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data => {
          setSearchResults(data.results)
        })
    }
  }, [searchText])






  return (
    <div>
      <Navbar searchText={searchText} setSearchText={setSearchText} />

      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="about/*" element={<About />} />
        <Route
          path="search/*"
          element={
            <SearchView keyword={searchText} searchResults={searchResults} />
          }
        />
        <Route path="movies/:id/*" element={<MovieView />} />

      </Routes>
    </div>
  );
}

export default App;
