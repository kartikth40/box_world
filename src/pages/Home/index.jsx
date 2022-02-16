import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MiddleSection from '../../components/MiddleSection'
import './style.css'

const Home = () => {
  const [disable, setDisable] = useState(false)
  return (
    <main className="page-container">
      <Header />
      <MiddleSection disable={disable} setDisable={setDisable} />
      <Footer disable={disable} setDisable={setDisable} />
    </main>
  )
}

export default Home
