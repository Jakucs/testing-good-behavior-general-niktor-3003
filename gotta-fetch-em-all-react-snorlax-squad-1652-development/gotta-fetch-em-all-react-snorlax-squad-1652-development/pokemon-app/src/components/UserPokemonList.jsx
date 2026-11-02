import React from "react";
import PokemonCard from "./PokemonCard";
import './UserPokemonList.css'

function UserPokemonList({ onSelect, pokemons}) {
  function handleClick(pokemon) {
    onSelect(pokemon);
  }

  return (
    <div className="user-pokemon-list">
      {pokemons.map((pokemon)=>{
    return(<PokemonCard
          pokemon={pokemon}
          key={pokemon.name}
          onClick={handleClick}
        />)
  })}
    </div>
  );
}

export default UserPokemonList;
