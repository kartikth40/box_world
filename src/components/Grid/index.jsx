import React from 'react'
import { rows, cols } from '../../assets/constants'

import './style.css'

const index = () => {
  const getGrid = () => {
    let tiles = new Array(rows * cols).fill(0).map((a, i) => i + 1)
    return (
      <div className="grid">
        {tiles.map((tileNo) => (
          <div tabindex="0" className={`tile tileNo${tileNo}`}></div>
        ))}
      </div>
    )
  }

  return <div className="grid-container">{getGrid()}</div>
}

export default index
