const handleMouseEvents = (setWordSelected, setValidity, setLoading) => {
  let wordInRow = null // player making a word in a row or not
  let isPressed = false // mouse is pressed on the board or not
  let selected = false // player has selected his word on his turn or not
  let fixedTilesCount = 1 // no. of tiles those are fixed as a letter is placed in it

  let firstTile = null // first tile from which player starts selecting word
  let singleTileSelection = false // if single letter is selected as a word
  let wordSelected = '' // to save the word selected by the player
  let wordsUsed = [] // all the previously used words will be saved in this array
  let tilesSelected = new Set() // all the tiles selected by the player

  const handleReselect = () => {
    // reinitializing the global variables
    wordInRow = null
    isPressed = false
    selected = false

    firstTile = null
    wordSelected = ''
    tilesSelected = new Set()

    document
      .querySelectorAll('.selected')
      .forEach((s) => s.classList.remove('selected'))

    document.querySelector('.reSelectBtn').classList.remove('enable')
  }

  const handleDone = async () => {
    if (wordSelected.length < 1) {
      alert('Select a word!')
      return
    }
    let currentFixedTilesCount = 0
    // calculate the no. of fixed tiles on the board right now to know if player has added a letter on the board or not on their turn
    document.querySelectorAll('.tile').forEach((t) => {
      if (t.innerText !== '') currentFixedTilesCount++
    })
    if (fixedTilesCount === currentFixedTilesCount) {
      alert('First add a letter to the board!')
      handleReselect()
      return
    }

    fixedTilesCount = currentFixedTilesCount
    setLoading(true)
    setWordSelected(wordSelected)
    let color = ''

    // function to check if the player selected word is valid or not
    async function check_if_word_exists(word) {
      word = word.toLowerCase()
      const url =
        'https://api.wordnik.com/v4/word.json/' +
        word +
        '/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
      await fetch(url)
        .then((res) => {
          if (wordsUsed.includes(wordSelected)) {
            console.log('word used before!')
            color = 'orange'
            setValidity(false)
          } else if (res.status === 200) {
            console.log('Exists -->')
            color = 'green'
            wordsUsed.push(wordSelected)
            setValidity(true)
          } else if (res.status === 429) {
            console.log('API limit exceeded -->')
            color = 'red'
            setValidity(false)
          } else {
            console.log('Not Exists -->')
            color = 'red'
            setValidity(false)
          }
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          setValidity(false)
          console.log(err)
        })
    }
    await check_if_word_exists(wordSelected)

    document
      .querySelectorAll('.selected')
      .forEach((s) => s.classList.add(`${color}`))

    handleReselect()

    setTimeout(() => {
      document.querySelectorAll(`.${color}`).forEach((s) => {
        s.classList.remove(`${color}`)
      })
    }, 2000)
  }

  document
    .querySelector('.reSelectBtn')
    .addEventListener('click', handleReselect)

  document.querySelector('.doneBtn').addEventListener('click', handleDone)

  // function to toggle Tiles (show them selected) that are selected by the player
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
      let firstTileFromFirstCol = firstTileNo % 7 === 0 ? 7 : firstTileNo % 7
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
      let firstTileFromFirstCol = firstTileNo % 7 === 0 ? 7 : firstTileNo % 7
      let tilesAvailable = []
      let range = [0, 6]
      for (let i = range[0]; i <= range[1]; i++) {
        if (!tilesSelected.has(i * 7 + firstTileFromFirstCol))
          tilesAvailable.push(i * 7 + firstTileFromFirstCol)
      }

      if (tilesAvailable.includes(tileNo) && tile.innerText !== '') {
        firstTile.classList.add('selected')
        tile.classList.add('selected')
        wordSelected += tile.innerText
        tilesSelected.add(firstTileNo)
        tilesSelected.add(tileNo)
      }
    }
  }

  // if mouse get up on the grid i.e, outside the boxes
  document.querySelector('.grid').addEventListener('mouseup', () => {
    if (isPressed && tilesSelected.size > 0) {
      isPressed = false
      selected = true
      wordSelected = firstTile.innerText + wordSelected

      document.querySelector('.reSelectBtn').classList.add('enable')
    }
  })

  // if mouse leaves the grid
  document.querySelector('.grid').addEventListener('mouseleave', () => {
    if (isPressed && tilesSelected.size > 0) {
      isPressed = false
      selected = true
      wordSelected = firstTile.innerText + wordSelected

      document.querySelector('.reSelectBtn').classList.add('enable')
    }
  })

  const tiles = document.querySelectorAll('.tile')

  tiles.forEach((tile) => {
    tile.addEventListener('mousedown', () => {
      if (selected) return
      isPressed = true
      firstTile = tile
      singleTileSelection = true
    })

    tile.addEventListener('mouseenter', () => {
      if (!isPressed || selected) return
      if (tile.innerText === '' && tilesSelected.size > 0) {
        selected = true
      }
      if (isPressed && tile.innerText === '') return
      singleTileSelection = false
      toggleTile(tile, firstTile)
    })

    tile.addEventListener('mouseup', () => {
      if (selected || !isPressed) return
      if (singleTileSelection && tile.innerText !== '') {
        selected = true
        wordSelected = tile.innerText
        tile.classList.add('selected')

        let tileNo = parseInt(tile.id.split('-')[1])
        tilesSelected.add(tileNo)
      } else if (tilesSelected.size > 0) {
        selected = true
        wordSelected = firstTile.innerText + wordSelected
      }
      if (selected)
        document.querySelector('.reSelectBtn').classList.add('enable')
      isPressed = false
    })
  })
}

export default handleMouseEvents
