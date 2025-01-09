import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonCards } from "./PokemonCards";
import { PokemonDetails } from "./PokemonDetails";
import { PokemonTypes } from "./PokemonTypes";

export const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 20; // Number of Pokémon per page

  const fetchPokemonList = async (page) => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;
      const pokemonPromises = Array.from({ length: limit }, (_, index) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${offset + index + 1}`).then(
          (res) => res.json()
        )
      );
      const fetchedPokemon = await Promise.all(pokemonPromises);
      setPokemonList(fetchedPokemon);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [currentPage]);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Main Pokémon List */}
        <Route
          path="/"
          element={
            <div className="pokemon-list">
              {loading ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  <ul className="cards">
                    {pokemonList.map((pokemon, index) => (
                      <PokemonCards
                        key={pokemon.id}
                        pokemonData={pokemon}
                        number={(currentPage - 1) * limit + index + 1}
                      />
                    ))}
                  </ul>
                  <div className="pagination">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button onClick={handleNextPage} className="pagination-btn">
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
