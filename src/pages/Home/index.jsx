import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MiddleSection from '../../components/MiddleSection'
import './style.css'

const index = () => {
  return (
    <main className="page-container">
      <Header />
      <MiddleSection />
      <Footer />
    </main>
  )
}

export default index
