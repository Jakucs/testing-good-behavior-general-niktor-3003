import React from 'react'
import './LocationCard.css'

const LOCATION_PALETTES = [
  { bg: '#e8f4fd', accent: '#5b9bd5', icon: '🗺️' },
  { bg: '#e8f7ee', accent: '#4caf7d', icon: '🌲' },
  { bg: '#fef3e8', accent: '#e8923a', icon: '🏔️' },
  { bg: '#f3e8fd', accent: '#9b5de5', icon: '🏙️' },
  { bg: '#fde8e8', accent: '#e85d5d', icon: '🌋' },
  { bg: '#e8fdf5', accent: '#26a69a', icon: '🌊' },
  { bg: '#fdfae8', accent: '#d4ac0d', icon: '⚡' },
  { bg: '#f0e8fd', accent: '#7b61ff', icon: '🔮' },
]

function formatName(name) {
  return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function LocationCardItem({ name, palette, onClick }) {
  return (
    <div className="loc-card" onClick={onClick} style={{ '--card-accent': palette.accent }}>
      <div className="loc-card__header" style={{ background: palette.bg }}>
        <span className="loc-card__icon">{palette.icon}</span>
      </div>
      <div className="loc-card__body">
        <h3 className="loc-card__name">{formatName(name)}</h3>
        <button className="loc-card__btn">Select</button>
      </div>
    </div>
  )
}

function LocationCard({ selectedLocation, locationData, locationsData, handleLocationClick, handleAreaClick }) {
  const items = selectedLocation
    ? locationData.areas
    : locationsData

  const clickHandler = selectedLocation ? handleAreaClick : handleLocationClick

  return (
    <div className="loc-grid-wrap">
      <h2 className="loc-grid-title">
        {selectedLocation ? `Areas in ${formatName(locationData.name || '')}` : 'Choose a Location'}
      </h2>
      <div className="loc-grid">
        {items.map((item, i) => (
          <LocationCardItem
            key={item.name}
            name={item.name}
            palette={LOCATION_PALETTES[i % LOCATION_PALETTES.length]}
            onClick={() => clickHandler(item.url)}
          />
        ))}
      </div>
    </div>
  )
}

export default LocationCard

