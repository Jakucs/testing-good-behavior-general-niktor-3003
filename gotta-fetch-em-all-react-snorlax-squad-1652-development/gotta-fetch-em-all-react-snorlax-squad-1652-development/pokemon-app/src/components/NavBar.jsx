import React from "react";

function NavBar({ selectedLocation, onGoBack, selectedPokemon, startFight, fight }) {
  return (
    <header className="navbar">
      <div className="navbar-side navbar-side-left">
        {selectedLocation && (
          <button className="navbar-back-button" onClick={onGoBack}>
            Go Back
          </button>
        )}
      </div>

      <h1 className="navbar-title">Pokemon Explorer</h1>

      <div className="navbar-side navbar-side-right">
        {selectedPokemon && !fight && (
          <button className="navbar-fight-button" onClick={() => startFight(true)}>
            Start Fight
          </button>
        )}
      </div>
    </header>
  );
}

export default NavBar;
