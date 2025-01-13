import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonCards } from "./PokemonCards";
import { PokemonDetails } from "./PokemonDetails";
import { PokemonTypes } from "./PokemonTypes";

export const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const limit = 40; // Number of Pokémon per page

  // Fetch all Pokémon for search functionality
  const fetchAllPokemon = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data = await res.json();
      const detailedPromises = data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );
      const allPokemon = await Promise.all(detailedPromises);
      setPokemonList(allPokemon);
      setFilteredPokemon(allPokemon);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all Pokémon data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    // Filter Pokémon list based on the search query
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query)
    );
    setFilteredPokemon(filtered);
  };

  // Pagination logic for filtered Pokémon
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="pokemon-list">
              {loading ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  <h1 className="">Pokémon List</h1>

                  {/* Search Bar */}
                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="Search Pokémon by name"
                      value={search}
                      onChange={handleSearch}
                      className="search-input"
                    />
                  </div>

                  {/* Pokémon Cards */}
                  <ul className="cards">
                    {paginatedPokemon.map((pokemon, index) => (
                      <PokemonCards
                        key={pokemon.id}
                        pokemonData={pokemon}
                        number={(currentPage - 1) * limit + index + 1}
                      />
                    ))}
                  </ul>

                  {/* Pagination */}
                  <div className="pagination">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage * limit >= filteredPokemon.length}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          }
        />
        <Route
          path="/pokemon/:pokemonId"
          element={<PokemonDetails pokemonList={pokemonList} />}
        />
        <Route path="/types" element={<PokemonTypes />} />
      </Routes>
    </Router>
  );
};
