const handleMouseEvents = (setWordSelected) => {
  let wordInRow = null
  let isPressed = false
  let selected = false

  let firstTile = null
  let wordSelected = ''
  let tilesSelected = new Set()

  const handleReselect = () => {
    wordInRow = null
    isPressed = false
    selected = false

    firstTile = null
    wordSelected = ''
    tilesSelected = new Set()

    document
      .querySelectorAll('.selected')
      .forEach((s) => s.classList.remove('selected'))
  }

  const handleDone = () => {
    setWordSelected(wordSelected)
    handleReselect()
  }

  document
    .querySelector('.reSelectBtn')
    .addEventListener('click', handleReselect)
  document.querySelector('.doneBtn').addEventListener('click', handleDone)

  const toggleTile = (tile, firstTile) => {
    const [firstElement, fTNo] = firstTile.id.split('-')
    const [element, tNo] = tile.id.split('-')
    const firstTileNo = parseInt(fTNo)
    const tileNo = parseInt(tNo)

    if (firstTile.innerText === '') {
      return
    }

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
      let tilesAvailable = []
      for (let i = range[0]; i <= range[1]; i++) {
        if (!tilesSelected.has(i)) tilesAvailable.push(i)
      }

      if (tilesAvailable.includes(tileNo) && tile.innerText !== '') {
        firstTile.classList.add('selected')
        tile.classList.add('selected')
        wordSelected += tile.innerText
        tilesSelected.add(firstTileNo)
        tilesSelected.add(tileNo)
      }
    }
    if (wordInRow === false && Math.abs(tileNo - firstTileNo) % 7 === 0) {
      let firstTileFromFirstCol = firstTileNo % 7
      let tilesAvailable = []
      let range = [1, 7]
      for (let i = range[0]; i <= range[1]; i++) {
        if (!tilesSelected.has(i * 7 + firstTileFromFirstCol))
          tilesAvailable.push(i * 7 + firstTileFromFirstCol)
      }
      console.log('collllll', tilesAvailable)
      if (tilesAvailable.includes(tileNo) && tile.innerText !== '') {
        firstTile.classList.add('selected')
        tile.classList.add('selected')
        wordSelected += tile.innerText
        tilesSelected.add(firstTileNo)
        tilesSelected.add(tileNo)
      }
    }
  }

  document.querySelector('.grid').addEventListener('mouseup', () => {
    if (isPressed && tilesSelected.size > 0) {
      isPressed = false
      selected = true
      wordSelected = firstTile.innerText + wordSelected

      // setWordSelected(wordSelected)
    }
  })
  document.querySelector('.grid').addEventListener('mouseleave', () => {
    if (isPressed && tilesSelected.size > 0) {
      isPressed = false
      selected = true
      wordSelected = firstTile.innerText + wordSelected

      // setWordSelected(wordSelected)
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
      if (tile.innerText === '' && tilesSelected.size > 0) {
        selected = true
      }
      toggleTile(tile, firstTile)
    })

    tile.addEventListener('mouseup', () => {
      if (selected || !isPressed) return

      if (tilesSelected.size > 0) {
        selected = true
        wordSelected = firstTile.innerText + wordSelected
        // setWordSelected(wordSelected)
      }
      isPressed = false
    })
  })
}

export default handleMouseEvents
