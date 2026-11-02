import React from "react";
import './PokemonCard.css'

function PokemonCard({ pokemon, onClick }) {
  return (
    <div className={`pokemon-card ${onClick ? 'pokemon-card--selectable' : 'pokemon-card--wild'}`}>
      <div className="pokemon-card__image-wrap">
        <img
          src={pokemon.sprites.other["official-artwork"]["front_default"]}
          alt={pokemon.species.name}
          className="pokemon-card__image"
        />
      </div>
      <div className="pokemon-card__body">
        <h2 className="pokemon-card__name">{pokemon.name.toUpperCase()}</h2>
        <div className="pokemon-card__stats">
          <span className="pokemon-card__stat-item"><span className="stat-label">HP</span> {pokemon.stats[0]["base_stat"]}</span>
          <span className="pokemon-card__stat-item"><span className="stat-label">ATK</span> {pokemon.stats[1]["base_stat"]}</span>
          <span className="pokemon-card__stat-item"><span className="stat-label">DEF</span> {pokemon.stats[2]["base_stat"]}</span>
        </div>
        <div className="pokemon-card__hp-bar">
          <div className="pokemon-card__hp-fill" style={{width: `${Math.min(100, Math.round(pokemon.stats[0]["base_stat"] / 255 * 100))}%`}}></div>
        </div>
        {onClick && <button className="pokemon-card__btn" onClick={() => onClick(pokemon)}>Choose</button>}
      </div>
    </div>
  );
}

export default PokemonCard;
