import { getStat } from "./pokemonUtils"

export function calculateDamage(attacker, defender) {
  const attack = getStat(attacker, "attack")
  const defense = getStat(defender, "defense") || 1

  const randomMultiplier = Math.floor(Math.random() * (255 - 217 + 1)) + 217

  const damage =
    ((((2 / 5 + 2) * attack * 60) / defense) / 50 + 2) * randomMultiplier / 255

  return Math.max(1, Math.floor(damage))
}
