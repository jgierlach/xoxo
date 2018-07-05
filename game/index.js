import {Map} from 'immutable'

//Action type
const MOVE = 'MOVE'

//Action creator
export const move = (player, position) => ({type: MOVE, player, position})

const initialState = {
  turn: 'X',
  board: Map()
}

export default function reducer(state = initialState, action) {
  // TODO
  switch (action.type) {
    case MOVE:
    // console.log('inside move case here is state', state)
     //console.log('inside move case here is action', action)
     winner(state.board)
      return ({ 
        turn: (action.player === 'X') ? 'O' : 'X',
        board: state.board.setIn(action.position, action.player)
      })
    default:
      return state
  }
}

// patern1 0,0 1,1 2,2
// pattern2 0,2 1,1 2,0 
// i[0] i[1] i[2]
// 0i 1i 2i


const streak = (board, coord1, coord2, coord3) => {
  const value = getIn(board, coord1);

  if (value === undefined) return undefined;

  if (value !== getIn(board, coord2)) return undefined;

  if (value !== getIn(board, coord3)) return undefined;

  return value;
}

const winner = (board) => {

  for (let i = 0; i < 3; i++) {
    const row = streak(board, [i,0], [i,1], [i,2]);
    if (row !== undefined) return row;
  }

  for (let i = 0; i < 3; i++) {
    const col = streak(board, [0,i], [1,i], [2,i]);
    if (col !== undefined) return col;
  }

  const d1 = streak(board, [0,0], [1,1], [2,2]);
  if (d1 !== undefined) return d1;

  const d2 = streak(board, [0,2], [1,1], [2,0]);
  if (d2 !== undefined) return d2;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let isEmpty = board.hasIn([i, j]);
      if (!isEmpty) return null;
    }
  }

  return 'draw';
}