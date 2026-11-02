import React from 'react'
import PokemonCard from './PokemonCard'
import UserPokemonList from './UserPokemonList'
import './EncounterScreen.css'

function EncounterScreen({ wildPokemon, setSelectedPokemon, userPokemons }) {
    return (
        <div className="encounter-screen">
            <section className="wild-encounter-section">
                <h1 className="wild-encounter-title">Wild Encounter!</h1>
                <p className="encounter-subtitle">A rare Pokémon has appeared in the tall grass.</p>

                <div className="wild-pokemon-card">
                    <PokemonCard pokemon={wildPokemon} />
                </div>
            </section>

            <div className="vs-divider">
                <div className="vs-divider-line"></div>
                <div className="vs-circle">VS</div>
                <div className="vs-divider-line"></div>
            </div>

            <section className="pokemon-selection-section">
                <h3 className="selection-title">Select Your Party Member</h3>
                <p className="selection-subtitle">Choose who will lead the battle</p>

                <div className="party-grid">
                    <UserPokemonList
                    pokemons={userPokemons}
                    onSelect={setSelectedPokemon} />
                </div>
            </section>
        </div>
    )
}

export default EncounterScreen
