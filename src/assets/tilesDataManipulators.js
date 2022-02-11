import { cols, rows } from './constants'

export const fixedTiles = () => {
  let tiles = new Array(rows * cols).fill(0).map((a, i) => i + 1)
  let fixed = []
  for (let i = 0; i < tiles.length; i++) {
    fixed.push(false)
  }
  return fixed
}
