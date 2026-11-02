import { useState, useEffect } from "react";
import "./App.css";
import {
  getLocations,
  getLocationAreas,
  getRandomPokemon,
  getPokemonDetails,
} from "./utils/api.js";
import pokemons from "./utils/pokemons.js";
import LocationCard from "./components/LocationCard";
import EncounterScreen from "./components/EncounterScreen.jsx";
import NavBar from "./components/NavBar.jsx";
import BattleArena from "./components/BattleArena.jsx";

function App() {
  const [userPokemons, setUserPokemons] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [wildPokeDetails, setWildPokeDetails] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [error, setError] = useState("");
  const [fight, setFight] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const locations = await getLocations();
        setLocationsData(locations.results ?? []);

        const starterPokemonDetails = await Promise.all(
          pokemons.map((pokemon) => getPokemonDetails(pokemon.url))
        );
        setUserPokemons(starterPokemonDetails);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchInitialData();
  }, []);

  const handleLocationClick = async (url) => {
    try {
      const data = await getLocationAreas(url);
      setError("");
      setLocationData(data);
      setSelectedLocation(true);
      setWildPokeDetails(null);
      setSelectedPokemon(null);
      setFight(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAreaClick = async (url) => {
    try {
      const pokemonUrl = await getRandomPokemon(url);
      const pokemonDetails = await getPokemonDetails(pokemonUrl);
      setError("");
      setWildPokeDetails(pokemonDetails);
      setSelectedPokemon(null);
      setFight(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePlayerVictory = (defeatedPokemon) => {
    setUserPokemons((prev) => {
      const alreadyOwned = prev.some((pokemon) => pokemon.name === defeatedPokemon.name);
      if (alreadyOwned) {
        return prev;
      }
      return [...prev, defeatedPokemon];
    });
  };

  const handleBattleEnd = () => {
    setFight(false);
    setWildPokeDetails(null);
    setSelectedPokemon(null);
    setSelectedLocation(false);
  };

  const handleGoBack = () => {
    setSelectedLocation(false);
    setLocationData([]);
    setWildPokeDetails(null);
    setSelectedPokemon(null);
    setFight(false);
    setError("");
  };

  return (
    <div>
      <NavBar
        selectedLocation={selectedLocation}
        onGoBack={handleGoBack}
        selectedPokemon={selectedPokemon}
        startFight={setFight}
        fight={fight}
      />

      {error && (
        <div className="error-banner">
          <span className="error-banner__icon">⚠</span>
          <p className="error-banner__text">{error}</p>
        </div>
      )}

      {!wildPokeDetails && (
        <LocationCard
          selectedLocation={selectedLocation}
          locationData={locationData}
          locationsData={locationsData}
          handleLocationClick={handleLocationClick}
          handleAreaClick={handleAreaClick}
        />
      )}

      {wildPokeDetails && !fight && (
        <EncounterScreen
          wildPokemon={wildPokeDetails}
          userPokemons={userPokemons}
          setSelectedPokemon={setSelectedPokemon}
        />
      )}

      {fight && selectedPokemon && wildPokeDetails && (
        <BattleArena
          playerPokemon={selectedPokemon}
          enemyPokemon={wildPokeDetails}
          onVictory={handlePlayerVictory}
          onBattleEnd={handleBattleEnd}
        />
      )}
    </div>
  );
}

export default App;
