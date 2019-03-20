

export default function reducer(board, action){
  switch(action){
      case 'left':

      case 'right':
        return {
          ...state, 
          count: state.count - action.payload,
          decreaseClicks: state.decreaseClicks + 1         
        };      
    default:
       return board;
  }
}