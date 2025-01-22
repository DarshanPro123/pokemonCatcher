import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonCards } from "./PokemonCards/PokemonCards";
import { PokemonDetails } from "./PokemonDetails";
import { PokemonTypes } from "./PokemonTypes";

export const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");

  const limit = 20;

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
      setDisplayedPokemon(allPokemon.slice(0, limit)); // Display the first batch
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching all Pokémon data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    // Filter Pokémon list based on the search query
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query)
    );
    setDisplayedPokemon(filtered.slice(0, limit)); // Reset displayed list to the first batch
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    const nextBatch = pokemonList.slice(
      displayedPokemon.length,
      displayedPokemon.length + limit
    );
    setDisplayedPokemon((prev) => [...prev, ...nextBatch]);
    setLoadingMore(false);
  };

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

                  {/* Fixed Search Bar */}
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
                    {displayedPokemon.map((pokemon, index) => (
                      <PokemonCards
                        key={pokemon.id}
                        pokemonData={pokemon}
                        number={index + 1}
                      />
                    ))}
                  </ul>

                  {/* Load More Button */}
                  {displayedPokemon.length < pokemonList.length && (
                    <div className="load-more">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="load-more-btn"
                      >
                        {loadingMore ? "Loading..." : "Load More"}
                      </button>
                    </div>
                  )}
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
