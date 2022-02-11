import React, { useState } from 'react'
import { rows, cols } from '../../assets/constants'
import { useDispatch, useSelector } from 'react-redux'

import './style.css'

const Grid = () => {
  const [tileSelected, setTileSelected] = useState(-1)
  const { keyPressed } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const handleTileClick = (e) => {
    dispatch({
      type: 'KEY_PRESSED',
      payload: { key: '' },
    })
    let tileId = e.target.id
    const [element, tile] = tileId.split('-')

    if (element === 'tile') {
      dispatch({
        type: 'TILE_SELECTED',
        payload: { tile: parseInt(tile) },
      })
      setTileSelected(parseInt(tile))
    }
  }

  const getGrid = () => {
    console.log(tileSelected)
    let tiles = new Array(rows * cols).fill(0).map((a, i) => i + 1)
    return (
      <div className="grid">
        {tiles.map((tileNo) => (
          <div
            key={tileNo}
            tabIndex="0"
            id={`tile-${tileNo}`}
            className="tile"
            onClick={handleTileClick}
          ></div>
        ))}
      </div>
    )
  }

  return <div className="grid-container">{getGrid()}</div>
}

export default Grid
