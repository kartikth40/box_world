import React, { useState } from 'react'
import './style.css'

const WinnerModal = ({ setShowWinner }) => {
  const handleClose = () => {
    document.querySelector('.page-container').classList.remove('blur')
    setShowWinner(false)
  }

  return (
    <div className="winner-container">
      <h1 className="win-heading">Winner</h1>

      <div className="win-buttons">
        <div className="left">
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
        <div className="right">
          <button>prev</button>
          <button>next</button>
        </div>
      </div>
    </div>
  )
}

export default WinnerModal
