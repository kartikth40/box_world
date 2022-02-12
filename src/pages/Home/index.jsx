import React from 'react'
import Header from '../../components/Header'
import Grid from '../../components/Grid'
import Footer from '../../components/Footer'
import './style.css'

const index = () => {
  return (
    <main className="page-container">
      <Header />
      <section className="middle-section">
        <div className="left-of-grid"></div>
        <Grid />
        <div className="right-of-grid">
          <div className="btn-container">
            <button className="reSelectBtn">Reselect</button>
            <button className="doneBtn">Done</button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default index
