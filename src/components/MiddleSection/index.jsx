import React, { useState, useEffect } from 'react'
import Grid from '../../components/Grid'
import handleMouseEvents from '../../assets/handleMouseEvents'

import './style.css'
import { useSelector } from 'react-redux'

const MiddleSection = ({ setWinner, disable, setDisable }) => {
  const [Player1Turn, setPlayer1Turn] = useState(true)
  const [wordSelected, setWordSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [validity, setValidity] = useState(null)
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)

  useEffect(() => {
    handleMouseEvents(setWordSelected, setValidity, setLoading)
  }, [])

  const { fixedTiles } = useSelector((state) => ({ ...state }))

  const checkTotalFixed = () => {
    let count = 0
    for (let tile in fixedTiles.tiles) {
      if (fixedTiles.tiles[tile]) count++
    }
    if (count >= 49) setWinner(score1 > score2 ? 1 : 2)
  }

  useEffect(() => {
    if (validity === null) return
    setDisable(false)

    const playerScore = document.querySelector(
      `#player-${Player1Turn ? 1 : 2}-score`
    )

    playerScore.innerText = `+${validity ? wordSelected.length : 0}`
    playerScore.style.left = '120%'

    setTimeout(() => {
      if (validity) {
        let newScore1 = score1 + (Player1Turn ? wordSelected.length : 0)
        let newScore2 = score2 + (!Player1Turn ? wordSelected.length : 0)
        if (newScore1 >= 30 || newScore2 >= 30) {
          setWinner(newScore1 > newScore2 ? 1 : 2)
        }
        if (Player1Turn) setScore1((prev) => prev + wordSelected.length)
        else setScore2((prev) => prev + wordSelected.length)
      } else {
        playerScore.innerText = Player1Turn ? score1 : score2
      }

      playerScore.style.left = '70%'
    }, 1500)

    setPlayer1Turn((prev) => !prev)
    setValidity(null)
    setWordSelected('')
    checkTotalFixed()
  }, [validity])

  const handleDone = () => {
    if (wordSelected.length < 1) return
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
      <Grid loading={loading} />
      <div className="right-of-grid">
        <div className="btn-container">
          <button className="reSelectBtn">Reselect</button>
          <button className="doneBtn" onClick={handleDone}>
            Done
          </button>
        </div>
      </div>
    </section>
  )
}

export default MiddleSection
