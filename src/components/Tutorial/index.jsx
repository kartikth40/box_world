import React from 'react'
import './style.css'

const Tutorial = ({ setShowTutorial }) => {
  const handleClose = () => {
    document.querySelector('.page-container').classList.remove('blur')
    setShowTutorial(false)
  }
  return (
    <div className="tutorial-container">
      <h1 className="tut-heading">Tutorial</h1>
      <div className="tut-content">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit error
        sapiente modi porro totam explicabo quasi deleniti, consequatur vitae
        quibusdam cupiditate et assumenda voluptates rem quae illo obcaecati
        maxime earum?
      </div>
      <div className="tut-footer">
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Tutorial
