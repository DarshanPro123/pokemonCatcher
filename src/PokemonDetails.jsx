import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PokemonDetails.css"; // Import the CSS file
import { typeColors } from "./color";

export const PokemonDetails = ({ pokemonList }) => {
  const { pokemonId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const pokemonData = pokemonList.find(
    (pokemon) => pokemon.id === parseInt(pokemonId)
  );

  if (!pokemonData) {
    return <h1>Pokémon not found!</h1>;
  }

  return (
    <div
      className="pokemon-details-container"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="pokemon-details-card">
        {/* Left side: Pokémon Image */}
        <figure
          className="pokemon-image-container"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <img
            src={pokemonData.sprites.other.home.front_shiny}
            alt={pokemonData.name}
            className="pokemon-image"
          />
        </figure>

        {/* Right side: Pokémon Information */}
        <div
          className="pokemon-info-container"
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          <h1>{pokemonData.name}</h1>
          <p>
            <strong>Height:</strong> {pokemonData.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemonData.weight}
          </p>
          <p>
            <strong>Base Experience:</strong> {pokemonData.base_experience}
          </p>
          <p>
            <strong>Types:</strong>
          </p>
          <div className="pokemon-types">
            {pokemonData.types.map((type) => {
              const bgColor = typeColors[type.type.name] || typeColors.default;
              return (
                <span
                  key={type.type.name}
                  className="pokemon-type-badge"
                  style={{ backgroundColor: bgColor }}
                >
                  {type.type.name}
                </span>
              );
            })}
          </div>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemonData.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
          <p>
            <strong>Speed:</strong> {pokemonData.stats[5].base_stat}
          </p>
          <p>
            <strong>Attack:</strong> {pokemonData.stats[1].base_stat}
          </p>
          <button onClick={() => navigate("/")} className="pokemon-back-button">
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};
