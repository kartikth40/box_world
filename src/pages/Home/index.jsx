import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MiddleSection from '../../components/MiddleSection'
import Tutorial from '../../components/Tutorial'
import WinnerModal from '../../components/WinnerModal'
import './style.css'

const Home = () => {
  const [disable, setDisable] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showWinner, setShowWinner] = useState(true)
  const [winner, setWinner] = useState(0)
  return (
    <>
      <main
        className={`page-container ${(showTutorial || showWinner) && 'blur'}`}
      >
        <Header setShowTutorial={setShowTutorial} />
        <MiddleSection
          setWinner={setWinner}
          disable={disable}
          setDisable={setDisable}
        />
        <Footer disable={disable} setDisable={setDisable} />
      </main>
      {showTutorial && <Tutorial setShowTutorial={setShowTutorial} />}
      {
        // winner !== 0 &&
        showWinner && <WinnerModal setShowWinner={setShowWinner} />
      }
    </>
  )
}

export default Home
