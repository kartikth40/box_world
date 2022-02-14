const handleMouseEvents = (setWordSelected, setValidity, setLoading) => {
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

  const handleDone = async () => {
    setLoading(true)
    setWordSelected(wordSelected)
    let color = ''
    async function check_if_word_exists(word) {
      word = word.toLowerCase()
      const url =
        'https://api.wordnik.com/v4/word.json/' +
        word +
        '/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
      await fetch(url)
        .then((res) => {
          if (res.status === 200) {
            console.log('Exists -->')
            color = 'green'
            setValidity(true)
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
      if (isPressed && tile.innerText === '') return
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
