const handleMouseEvents = (setWordSelected) => {
  let wordInRow = null
  let isPressed = false
  let selected = false
  let firstTile = null
  let wordSelected = ''

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
        firstTile.classList.add('selected')
        tile.classList.add('selected')
        wordSelected += tile.innerText
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
        firstTile.classList.add('selected')
        tile.classList.add('selected')
        wordSelected += tile.innerText
      }
    }
  }

  document.querySelector('.grid').addEventListener('mouseup', () => {
    if (isPressed) {
      isPressed = false
      selected = true
      wordSelected = firstTile.innerText + wordSelected

      setWordSelected(wordSelected)
    }
  })
  document.querySelector('.grid').addEventListener('mouseleave', () => {
    if (isPressed) {
      isPressed = false
      selected = true
      wordSelected = firstTile.innerText + wordSelected

      setWordSelected(wordSelected)
    }
  })

  const tiles = document.querySelectorAll('.tile')
  tiles.forEach((tile) => {
    tile.addEventListener('mousedown', () => {
      if (selected) return
      isPressed = true
      firstTile = tile
    })

    tile.addEventListener('mouseenter', () => {
      if (!isPressed || selected) return
      toggleTile(tile, firstTile)
    })

    tile.addEventListener('mouseup', () => {
      if (selected || !isPressed) return
      if (firstTile !== tile) {
        selected = true
        wordSelected = firstTile.innerText + wordSelected
        setWordSelected(wordSelected)
      }
      isPressed = false
    })
  })
}

export default handleMouseEvents
