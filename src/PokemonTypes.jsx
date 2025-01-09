import { useEffect, useState } from "react";

export const PokemonTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://pokeapi.co/api/v2/type";

  const fetchTypes = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTypes(data.results); // `results` contains the list of all types
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  if (loading) {
    return <div>Loading types...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Pokémon Types</h1>
      <ul>
        {types.map((type) => (
          <li key={type.name}>{type.name}</li>
        ))}
      </ul>
    </div>
  );
};
