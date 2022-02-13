import React, { useState, useEffect } from 'react'
import Grid from '../../components/Grid'
import handleMouseEvents from '../../assets/handleMouseEvents'

import './style.css'

const MiddleSection = () => {
  const [wordSelected, setWordSelected] = useState('')

  useEffect(() => {
    handleMouseEvents(setWordSelected)
  }, [])

  const handleDone = () => {
    if (wordSelected.length < 1) alert('Select a word!')
    async function check_if_word_exists(word) {
      word = word.toLowerCase()
      const url =
        'https://api.wordnik.com/v4/word.json/' +
        word +
        '/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
      await fetch(url).then((res) => {
        if (res.status === 200) {
          console.log('Exists -->')
        } else {
          console.log('Not Exists -->')
        }
      })
    }
    check_if_word_exists(wordSelected)
  }

  return (
    <section className="middle-section">
      <div className="left-of-grid">
        <div className="player-turn">Player 1's turn</div>
        <div className="players-container">
          <div className="player-container">
            <div id="player-1" className="player">
              P1
            </div>
            <div className="player-score"></div>
          </div>
          <div className="player-container">
            <div id="player-2" className="player">
              P2
            </div>
            <div className="player-score"></div>
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
