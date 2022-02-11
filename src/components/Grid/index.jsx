import React, { useState, useEffect } from 'react'
import { rows, cols } from '../../assets/constants'
import { useDispatch, useSelector } from 'react-redux'

import './style.css'

const Grid = () => {
  const [tileSelected, setTileSelected] = useState(-1)
  const { keyPressed, fixedTiles } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  useEffect(() => {
    if (tileSelected === -1) return
    if (document.querySelector('.active'))
      document.querySelector('.active').classList.remove('active')
    document.querySelector(`#tile-${tileSelected}`).classList.add('active')
  }, [tileSelected])

  const handleTileClick = (e) => {
    dispatch({
      type: 'KEY_PRESSED',
      payload: { key: '' },
    })
    let tileId = e.target.id
    const [element, tile] = tileId.split('-')

    if (element === 'tile' && !fixedTiles.tiles[parseInt(tile) - 1]) {
      dispatch({
        type: 'TILE_SELECTED',
        payload: { tile: parseInt(tile) },
      })
      setTileSelected(parseInt(tile))
    } else {
      dispatch({
        type: 'TILE_SELECTED',
        payload: { tile: -1 },
      })
      setTileSelected(-1)
    }
  }

  const getGrid = () => {
    // console.log(tileSelected)
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
