import React from 'react'
import './style.css'

const index = () => {
  const handleKeyPress = (e) => {
    let keyId = e.target.id
    const [id, key] = keyId.split('-')
    if (id === 'key') {
      console.log(key)
    }
  }

  return (
    <footer className="keyboard-footer">
      <div className="keyboard-row keyboard-row-1st">
        <div onClick={handleKeyPress} id="key-q" className="key">
          q
        </div>
        <div onClick={handleKeyPress} id="key-w" className="key">
          w
        </div>
        <div onClick={handleKeyPress} id="key-e" className="key">
          e
        </div>
        <div onClick={handleKeyPress} id="key-r" className="key">
          r
        </div>
        <div onClick={handleKeyPress} id="key-t" className="key">
          t
        </div>
        <div onClick={handleKeyPress} id="key-y" className="key">
          y
        </div>
        <div onClick={handleKeyPress} id="key-u" className="key">
          u
        </div>
        <div onClick={handleKeyPress} id="key-i" className="key">
          i
        </div>
        <div onClick={handleKeyPress} id="key-o" className="key">
          o
        </div>
        <div onClick={handleKeyPress} id="key-p" className="key">
          p
        </div>
      </div>
      <div className="keyboard-row keyboard-row-2nd">
        <div onClick={handleKeyPress} id="key-a" className="key">
          a
        </div>
        <div onClick={handleKeyPress} id="key-s" className="key">
          s
        </div>
        <div onClick={handleKeyPress} id="key-d" className="key">
          d
        </div>
        <div onClick={handleKeyPress} id="key-f" className="key">
          f
        </div>
        <div onClick={handleKeyPress} id="key-g" className="key">
          g
        </div>
        <div onClick={handleKeyPress} id="key-h" className="key">
          h
        </div>
        <div onClick={handleKeyPress} id="key-j" className="key">
          j
        </div>
        <div onClick={handleKeyPress} id="key-k" className="key">
          k
        </div>
        <div onClick={handleKeyPress} id="key-l" className="key">
          l
        </div>
      </div>
      <div className="keyboard-row keyboard-row-3rd">
        <div onClick={handleKeyPress} id="key-z" className="key">
          z
        </div>
        <div onClick={handleKeyPress} id="key-x" className="key">
          x
        </div>
        <div onClick={handleKeyPress} id="key-c" className="key">
          c
        </div>
        <div onClick={handleKeyPress} id="key-v" className="key">
          v
        </div>
        <div onClick={handleKeyPress} id="key-b" className="key">
          b
        </div>
        <div onClick={handleKeyPress} id="key-n" className="key">
          n
        </div>
        <div onClick={handleKeyPress} id="key-m" className="key">
          m
        </div>
      </div>
    </footer>
  )
}

export default index
