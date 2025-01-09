import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonCards } from "./PokemonCards";
import { PokemonDetails } from "./PokemonDetails";
import { PokemonTypes } from "./PokemonTypes";

export const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const pokemonPromises = Array.from({ length: 20 }, (_, index) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`).then((res) =>
          res.json()
        )
      );
      const fetchedPokemon = await Promise.all(pokemonPromises);
      setPokemonList(fetchedPokemon);
    };

    fetchPokemonList();
  }, []);
  return (
    <Router>
      <Routes>
        {/* Route for the Pokémon list */}
        <Route
          path="/"
          element={
            <ul className="cards">
              {pokemonList.map((pokemon, index) => (
                <PokemonCards
                  key={pokemon.id}
                  pokemonData={pokemon}
                  number={index + 1}
                />
              ))}
            </ul>
          }
        />
        {/* Route for Pokémon details */}
        <Route
          path="/pokemon/:pokemonId"
          element={<PokemonDetails pokemonList={pokemonList} />}
        />
        <Route path="/types" element={<PokemonTypes />} />
      </Routes>
    </Router>
  );
};
