export const keyReducer = (state = { key: 'abc' }, action) => {
  switch (action.type) {
    case 'KEY_PRESSED':
      return { ...state, ...action.payload }

    default:
      return state
  }
}
