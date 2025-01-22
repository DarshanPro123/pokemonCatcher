import { useNavigate } from "react-router-dom";
import { typeColors } from "../color";
import "./PokemonCards.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const PokemonCards = ({ pokemonData, number }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemonData.id}`);
  };
  return (
    <li className="pokemon-card" onClick={handleCardClick}>
      <figure>
        <img
          data-aos="fade-up"
          data-aos-duration="1000"
          // src={pokemonData.sprites.other.home.front_shiny}
          src={pokemonData.sprites.other["official-artwork"].front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </figure>
      <span className="pokemon-num">#{number}</span>
      <h1 className="pokemon-name">{pokemonData.name}</h1>
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
    </li>
  );
};
