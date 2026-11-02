import React from 'react'
import { getPokemonName, getPokemonSprite } from "../utils/pokemonUtils.js";
import './WinnerScreen.css'

function WinnerScreen({winnerPokemon, onGoBack}) {
  return (
    <div className="winner-screen">
      <div className="winner-pokemon-showcase">
        <img src={getPokemonSprite(winnerPokemon)} alt={getPokemonName(winnerPokemon)} className="winner-pokemon-img" />
      </div>
      <div className="winner-details">
        <h2 className="winner-pokemon-name">{getPokemonName(winnerPokemon)}</h2>
        <p className="winner-subtitle">won the battle!</p>
        <button className="winner-back-button" onClick={onGoBack}>
          Continue your journey!
        </button>
      </div>
    </div>
  )
}

export default WinnerScreen