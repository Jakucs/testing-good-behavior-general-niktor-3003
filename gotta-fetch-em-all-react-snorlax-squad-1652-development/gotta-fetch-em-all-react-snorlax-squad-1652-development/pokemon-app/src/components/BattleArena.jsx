import React, { useEffect, useState, useEffectEvent} from "react";
import { getStat, getPokemonName, getPokemonSprite } from "../utils/pokemonUtils.js";
import { calculateDamage } from "../utils/battle.js";
import BattleLog from "./BattleLog.jsx";
import WinnerScreen from "./WinnerScreen.jsx";
import './BattleArena.css';

function useInterval(callback, delay) {
  const onTick = useEffectEvent(callback);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => {
      onTick();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
}

function BattleArena({ playerPokemon, enemyPokemon, onBattleEnd,onVictory }) {
  const [playerHp, setPlayerHp] = useState(getStat(playerPokemon, "hp"));
  const [enemyHp, setEnemyHp] = useState(getStat(enemyPokemon, "hp"));
  const [battleLog, setBattleLog] = useState([]);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState("player");
  const [delay, setDelay] = useState(500);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayerHp(getStat(playerPokemon, "hp"));
    setEnemyHp(getStat(enemyPokemon, "hp"));
    setBattleLog([
      `${getPokemonName(playerPokemon)} entered the battle!`,
      `A wild ${getPokemonName(enemyPokemon)} appeared!`,
    ]);
    setWinner(null);
    setTurn("player");
    setDelay(500);
  }, [playerPokemon, enemyPokemon]);
  
  useInterval(() => {
    if (winner) {
      return;
    }

    if (turn === "player") {
      const damage = calculateDamage(playerPokemon, enemyPokemon);
      const newEnemyHp = Math.max(enemyHp - damage, 0);

      setEnemyHp(newEnemyHp);
      setBattleLog((prev) => [
        ...prev,
        `${getPokemonName(playerPokemon)} dealt ${damage} damage to ${getPokemonName(enemyPokemon)}.`,
      ]);

      if (newEnemyHp <= 0) {
        setWinner("player");
        setBattleLog((prev) => [
          ...prev,
          `${getPokemonName(enemyPokemon)} fainted.`,
          `${getPokemonName(playerPokemon)} wins!`,
        ]);
        setDelay(null);
        return;
      }

      setTurn("enemy");
      return;
    }

    if (turn === "enemy") {
      const damage = calculateDamage(enemyPokemon, playerPokemon);
      const newPlayerHp = Math.max(playerHp - damage, 0);

      setPlayerHp(newPlayerHp);
      setBattleLog((prev) => [
        ...prev,
        `${getPokemonName(enemyPokemon)} dealt ${damage} damage to ${getPokemonName(playerPokemon)}.`,
      ]);

      if (newPlayerHp <= 0) {
        setWinner("enemy");
        setBattleLog((prev) => [
          ...prev,
          `${getPokemonName(playerPokemon)} fainted.`,
          `${getPokemonName(enemyPokemon)} wins!`,
        ]);
        setDelay(null);
        return;
      }

      setTurn("player");
    }
  }, delay);

  useEffect(() => {
    if (!winner) {
      return;
    }

    if (winner === "player") {
      onVictory(enemyPokemon);
    }

    const timeoutId = setTimeout(() => {
      onBattleEnd();
    }, 60000);

    return () => clearTimeout(timeoutId);
  }, [winner, enemyPokemon, onBattleEnd, onVictory]);

  return (
    <div className="battle-arena">
      {winner ? (
        <div className="battle-result">
          <h2 className={`battle-result-title ${winner === "player" ? "result-victory" : "result-defeat"}`}>
            {winner === "player" ? "You won!" : "You lost!"}
          </h2>
          <WinnerScreen winnerPokemon={winner === "player" ? playerPokemon : enemyPokemon}
            onGoBack={onBattleEnd}
          />
        </div>
      ) : (
        <div className="battle-field">
          <div className="battle-pokemon-side player-side">
            <div className="pokemon-frame">
              <img
                src={getPokemonSprite(playerPokemon)}
                alt={getPokemonName(playerPokemon)}
              />
            </div>
            <div className="pokemon-battle-info">
              <span className="pokemon-name-badge player-badge">{getPokemonName(playerPokemon)}</span>
              <div className="hp-section">
                <div className="hp-bar-header">
                  <span className="hp-label">HP</span>
                  <span className="hp-numbers">{playerHp} / {getStat(playerPokemon, 'hp')}</span>
                </div>
                <div className="hp-bar-track">
                  <div className="hp-bar-fill player-hp" style={{width: `${Math.max(0, Math.round(playerHp / getStat(playerPokemon, 'hp') * 100))}%`}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="battle-vs-badge">VS</div>

          <div className="battle-pokemon-side enemy-side">
            <div className="pokemon-frame">
              <img
                src={getPokemonSprite(enemyPokemon)}
                alt={getPokemonName(enemyPokemon)}
              />
            </div>
            <div className="pokemon-battle-info">
              <span className="pokemon-name-badge enemy-badge">{getPokemonName(enemyPokemon)}</span>
              <div className="hp-section">
                <div className="hp-bar-header">
                  <span className="hp-label">HP</span>
                  <span className="hp-numbers">{enemyHp} / {getStat(enemyPokemon, 'hp')}</span>
                </div>
                <div className="hp-bar-track">
                  <div className="hp-bar-fill enemy-hp" style={{width: `${Math.max(0, Math.round(enemyHp / getStat(enemyPokemon, 'hp') * 100))}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BattleLog logs={battleLog} />
    </div>
  );
}

export default BattleArena;