import { useNavigate } from "react-router-dom";

export const PokemonCards = ({ pokemonData, number }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemonData.id}`);
  };
  return (
    <li className="pokemon-card" onClick={handleCardClick}>
      <span>{number}</span>
      <figure>
        <img
          src={pokemonData.sprites.other.home.front_shiny}
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </figure>
      <h1 className="pokemon-name">{pokemonData.name}</h1>
      <div className="pokemon-info pokemon-highlight">
        <p>
          {pokemonData.types.map((curType) => curType.type.name).join(", ")}
        </p>
      </div>

      <div className="grid-three-cols">
        <p className="pokemon-info">
          <span> Height:</span> {pokemonData.height}
        </p>
        <p className="pokemon-info">
          <span> Weight:</span> {pokemonData.weight}
        </p>
        <p className="pokemon-info">
          <span> speed:</span> {pokemonData.stats[5].base_stat}
        </p>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info">
          <p>
            <span> Experience:</span>
            {pokemonData.base_experience}
          </p>
        </div>
        <div className="pokemon-info">
          <p>
            <span>Attack:</span>
            {pokemonData.stats[1].base_stat}
          </p>
        </div>
        <div className="pokemon-info">
          <p>
            <span>Abilities:</span>
            {pokemonData.abilities
              .map((abilityInfo) =>
                abilityInfo.ability.name.split("-").join(" ")
              )
              .slice(0, 1)
              .join(", ")}
          </p>
        </div>
      </div>
    </li>
  );
};
