import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MiddleSection from '../../components/MiddleSection'
import './style.css'
import Tutorial from '../../components/Tutorial'

const Home = () => {
  const [disable, setDisable] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)
  return (
    <>
      <main className="page-container blur">
        <Header />
        <MiddleSection disable={disable} setDisable={setDisable} />
        <Footer disable={disable} setDisable={setDisable} />
      </main>
      {showTutorial && <Tutorial setShowTutorial={setShowTutorial} />}
    </>
  )
}

export default Home
