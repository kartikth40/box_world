import React, { useState } from 'react'
import './style.css'

const Tutorial = ({ setShowTutorial }) => {
  const [tutorialPoint, setTutorialPoint] = useState(1)
  const [prevDisable, setPrevDisable] = useState(true)
  const [nextDisable, setNextDisable] = useState(false)
  const handleClose = () => {
    document.querySelector('.page-container').classList.remove('blur')
    setShowTutorial(false)
  }

  const handleNext = () => {
    if (tutorialPoint === 6) {
      setNextDisable(true)
    }
    if (tutorialPoint === 1) {
      setPrevDisable(false)
    }
    let progress = ((tutorialPoint + 1) / 7) * 100 - 100
    document
      .querySelector('.tut-progress')
      .style.setProperty('--progress', `${progress}%`)

    setTutorialPoint((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (tutorialPoint === 2) {
      setPrevDisable(true)
    }
    if (tutorialPoint === 7) {
      setNextDisable(false)
    }
    let progress = ((tutorialPoint - 1) / 7) * 100 - 100
    document
      .querySelector('.tut-progress')
      .style.setProperty('--progress', `${progress}%`)

    setTutorialPoint((prev) => prev - 1)
  }

  return (
    <div className="tutorial-container">
      <div className="tut-progress"></div>
      <h1 className="tut-heading">Tutorial</h1>
      <div className="tut-content">
        {tutorialPoint === 1 && (
          <div className="tut-points tut1">
            <div className="tut-img">
              <img src="/images/tut1.gif" alt="tut1-gif" />
            </div>
            <p>start the game by adding a letter to the board.</p>
          </div>
        )}

        {tutorialPoint === 2 && (
          <div className="tut-points tut2">
            <div className="tut-img">
              <img src="/images/tut2.gif" alt="tut1-gif" />
            </div>
            <p>
              once a player added a letter to the word, he/she needs to select a
              valid word from the available letters on the grid to earn points.
            </p>
          </div>
        )}

        {tutorialPoint === 3 && (
          <div className="tut-points tut3">
            <div className="tut-img">
              <img src="/images/tut3.gif" alt="tut1-gif" />
            </div>
            <p>
              now press the Done button to submit your word and wait to see if
              you entered a valid word or not
            </p>
          </div>
        )}
        {tutorialPoint === 4 && (
          <div className="tut-points tut4">
            <div className="tut-img">
              <img src="/images/tut4.gif" alt="tut1-gif" />
            </div>
            <p>
              a valid word if selected will be highlighted with green color
              otherwise red.
            </p>
          </div>
        )}
        {tutorialPoint === 5 && (
          <div className="tut-points tut5">
            <div className="tut-img">
              <img src="/images/tut5.gif" alt="tut1-gif" />
            </div>
            <p>
              the length of the valid word submitted will be your current score
              that will be added to your total score.
            </p>
          </div>
        )}
        {tutorialPoint === 6 && (
          <div className="tut-points tut6">
            <div className="tut-img">
              <img src="/images/tut6.gif" alt="tut1-gif" />
            </div>
            <p>
              now the player turn changes and second player is required to
              follow the same steps to score points
            </p>
          </div>
        )}
        {tutorialPoint === 7 && (
          <div className="tut-point-final">
            <p>
              first one to score 50 points or one with more points than other
              when the grid is full will win the game.
            </p>
          </div>
        )}
      </div>
      <div className="tut-buttons">
        <div className="left">
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
        <div className="right">
          <button
            className="prev-btn"
            disabled={prevDisable}
            onClick={handlePrev}
          >
            prev
          </button>
          <button
            className="next-button"
            disabled={nextDisable}
            onClick={handleNext}
          >
            next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
