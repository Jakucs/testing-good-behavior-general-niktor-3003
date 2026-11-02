const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API hiba: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
}

export async function getLocations() {
    const data = await fetchJson(`${BASE_URL}/location`)
    return data
}

export async function getLocationAreas(url) {
  const data = await fetchJson(url);
  if (!data.areas?.length) {
    throw new Error("This location doesn't seem to have any areas");
  }
  return data;
}

export async function getRandomPokemon(url) {
  const data = await fetchJson(url);
  if (!data.pokemon_encounters?.length) {
    throw new Error("This location doesn't seem to have any pokémon");
  }
  const randomIndex = Math.floor(Math.random() * data.pokemon_encounters.length);

  const randomPoke = data.pokemon_encounters[randomIndex].pokemon;
  
  return randomPoke.url;
}

export async function getPokemonDetails(url) {
  const data = await fetchJson(url);
  return data;
}
