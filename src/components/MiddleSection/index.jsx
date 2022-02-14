import React, { useState, useEffect } from 'react'
import Grid from '../../components/Grid'
import handleMouseEvents from '../../assets/handleMouseEvents'

import './style.css'

const MiddleSection = () => {
  const [Player1Turn, setPlayer1Turn] = useState(true)
  const [wordSelected, setWordSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [validity, setValidity] = useState(null)
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)

  useEffect(() => {
    handleMouseEvents(setWordSelected, setValidity, setLoading)
  }, [])

  useEffect(() => {
    if (validity === null) return

    document.querySelector(
      `#player-${Player1Turn ? 1 : 2}-score`
    ).innerText = `+${validity ? wordSelected.length : 0}`
    document.querySelector(`#player-${Player1Turn ? 1 : 2}-score`).style.left =
      '120%'
    setTimeout(() => {
      if (validity) {
        if (Player1Turn) setScore1((prev) => prev + wordSelected.length)
        else setScore2((prev) => prev + wordSelected.length)
      } else {
        document.querySelector(
          `#player-${Player1Turn ? 1 : 2}-score`
        ).innerText = Player1Turn ? score1 : score2
      }

      document.querySelector(
        `#player-${Player1Turn ? 1 : 2}-score`
      ).style.left = '70%'
    }, 1500)

    setPlayer1Turn((prev) => !prev)
    setValidity(null)
  }, [validity])

  const handleDone = () => {
    if (wordSelected.length < 1) alert('Select a word!')
  }

  return (
    <section className="middle-section">
      <div className="left-of-grid">
        <div className="player-turn">{`Player ${
          Player1Turn ? 1 : 2
        }'s turn`}</div>
        <div className="players-container">
          <div className="player-container">
            <div id="player-1" className="player">
              P1
            </div>
            <div id="player-1-score" className="player-score">
              {score1}
            </div>
          </div>
          <div className="player-container">
            <div id="player-2" className="player">
              P2
            </div>
            <div id="player-2-score" className="player-score">
              {score2}
            </div>
          </div>
        </div>
      </div>
      <Grid />
      <div className="right-of-grid">
        <div className="btn-container">
          <button className="reSelectBtn">Reselect</button>
          <button className="doneBtn" onClick={handleDone}>
            Done
          </button>
          <div>{JSON.stringify(wordSelected)}</div>
        </div>
      </div>
    </section>
  )
}

export default MiddleSection
