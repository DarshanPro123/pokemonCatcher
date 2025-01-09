import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PokemonDetails.css"; // Import the CSS file

const typeColors = {
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  stellar: "#FFD700", // Custom type for 'stellar'
  default: "#A8A878", // Fallback color
};

export const PokemonDetails = ({ pokemonList }) => {
  const { pokemonId } = useParams();
  const navigate = useNavigate();

  // Initialize AOS animations
  useEffect(() => {
    AOS.init();
  }, []);

  // Find the selected Pokémon based on its number
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
          data-aos="zoom-in"
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
