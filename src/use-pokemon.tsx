"use client";

import { use } from "react";
import ky from "ky";

interface Pokemon {
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

const fetchPokemon = () =>
  ky.get("https://pokeapi.co/api/v2/pokemon/ditto").json<Pokemon>();

const UsePokemon = () => {
  const data = use(fetchPokemon());
  return (
    <div className="flex flex-col gap-2 rounded bg-gray-800 p-5">
      <p>using react use</p>
      {data.abilities.map((ability) => {
        return (
          <div key={ability.ability.name} className="bg-gray rounded p-2">
            {ability.ability.name}
          </div>
        );
      })}
    </div>
  );
};

export default UsePokemon;
