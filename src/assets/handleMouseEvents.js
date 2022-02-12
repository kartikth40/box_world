const handleMouseEvents = () => {
  let wordInRow = null
  let isPressed = false
  let selected = false
  let firstTile = null

  const toggleTile = (tile, firstTile) => {
    const [firstElement, fTNo] = firstTile.id.split('-')
    const [element, tNo] = tile.id.split('-')
    const firstTileNo = parseInt(fTNo)
    const tileNo = parseInt(tNo)

    if (firstElement === 'tile' && element === 'tile') {
      if (Math.abs(tileNo - firstTileNo) < 7 && wordInRow === null) {
        wordInRow = true
      } else if (
        Math.abs(tileNo - firstTileNo) % 7 === 0 &&
        wordInRow === null
      ) {
        wordInRow = false
      }
    }

    if (wordInRow && Math.abs(tileNo - firstTileNo) < 7) {
      let firstTileFromFirstCol = firstTileNo % 7
      let range = [
        firstTileNo - firstTileFromFirstCol + 1,
        firstTileNo + 7 - firstTileFromFirstCol,
      ]

      if (tileNo >= range[0] && tileNo <= range[1]) {
        firstTile.classList.add('red')
        tile.classList.add('red')
      }
    }
    if (wordInRow === false && Math.abs(tileNo - firstTileNo) % 7 === 0) {
      let firstTileFromFirstCol = firstTileNo % 7
      let range = []
      let rowNo = [1, 2, 3, 4, 5, 6, 7]
      for (let i = 0; i < rowNo.length; i++) {
        range.push(i * 7 + firstTileFromFirstCol)
      }

      if (range.includes(tileNo)) {
        firstTile.classList.add('red')
        tile.classList.add('red')
      }
    }
  }

  document.querySelector('.grid').addEventListener('mouseup', () => {
    if (isPressed) {
      isPressed = false
      selected = true
    }
  })
  document.querySelector('.grid-container').addEventListener('mouseup', () => {
    if (isPressed) {
      isPressed = false
      selected = true
    }
  })

  const tiles = document.querySelectorAll('.tile')
  tiles.forEach((tile) => {
    tile.addEventListener('mousedown', () => {
      if (selected) return
      isPressed = true
      firstTile = tile
      console.log('down')
    })

    tile.addEventListener('mouseenter', () => {
      console.log('ENTER ------> press, selected', isPressed, selected)
      if (!isPressed || selected) return
      console.log('enter')
      toggleTile(tile, firstTile)
    })

    tile.addEventListener('mouseup', () => {
      console.log('UP ------> press, selected', isPressed, selected)

      if (selected || !isPressed) return
      if (firstTile !== tile) {
        selected = true
      }
      isPressed = false
      console.log('up')
    })
  })
}

export default handleMouseEvents
