export function getStat(pokemon, statName) {
  if (!pokemon || !pokemon.stats) {
    return 0
  }

  const statData = pokemon.stats.find((item) => item.stat.name === statName)

  return statData ? statData.base_stat : 0
}

export function getPokemonName(pokemon) {
  return pokemon?.name ?? ""
}

export function getPokemonSprite(pokemon) {
  return pokemon.sprites.other["official-artwork"]["front_default"] ?? ""
}
