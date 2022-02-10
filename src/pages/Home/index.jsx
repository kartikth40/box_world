import React from 'react'
import Header from '../../components/Header'
import Grid from '../../components/Grid'
import './style.css'

const index = () => {
  return (
    <main className="page-container">
      <Header />
      <section className="middle-section">
        <div className="left-of-grid"></div>
        <Grid />
        <div className="right-of-grid"></div>
      </section>
    </main>
  )
}

export default index
