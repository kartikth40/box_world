import React from 'react'
import './style.css'

const WinnerModal = ({ setShowWinner, winner }) => {
  const handleClose = () => {
    document.querySelector('.page-container').classList.remove('blur')
    document.querySelector('.reSelectBtn').style = 'none'
    document.querySelector('.doneBtn').style = 'none'
    setShowWinner(false)
  }

  return (
    <div className="winner-container">
      <h1 className="win-heading">Winner</h1>
      <div className="win-content">Player {winner} Won 🏆</div>
      <div className="win-buttons">
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default WinnerModal
