import React from 'react'
import './style.css'

const Header = ({ setShowTutorial }) => {
  return (
    <header className="main-header">
      <div className="left-header"></div>
      <div className="game-logo">Box World</div>
      <div className="right-header">
        <button className="tut-btn" onClick={() => setShowTutorial(true)}>
          ?
        </button>
      </div>
    </header>
  )
}

export default Header
