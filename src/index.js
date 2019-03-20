import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

//const app = document.getElementById('app');
//ReactDOM.render(<App />, app);

import { createStore } from 'redux';

console.log('createStore', createStore);

const INCREASE_COUNTER = 'INCREASE_COUNTER';
const DECREASE_COUNTER = 'DECREASE_COUNTER';

function increaseCounter(amount){
  return {
    type: INCREASE_COUNTER,
    payload: amount
  }
}

function decreaseCounter(amount){
  return {
    type: DECREASE_COUNTER,
    payload: amount
  }
}

// Reducer
function counterReducer(state={count:0, increaseClicks:0, decreaseClicks:0}, action){
  switch(action.type){
      case INCREASE_COUNTER:
        return {
          ...state,
          count: state.count + action.payload,
          increaseClicks: state.increaseClicks + 1
        };
      case DECREASE_COUNTER:
        return {
          ...state, 
          count: state.count - action.payload,
          decreaseClicks: state.decreaseClicks + 1          
        };      
    default:
       return state;
  }
}
let store = createStore(counterReducer);

    // Reference UI elements
    const increaseCounterButton = document.getElementById('increaseCounterButton');
    const decreaseCounterButton = document.getElementById('decreaseCounterButton');
    const countLabel = document.getElementById('countLabel');

    // Botones conectados a eventos
    increaseCounterButton.addEventListener('click', ()=>{
      const action = increaseCounter(1); // Objeto accion
      store.dispatch(action);
    });

    decreaseCounterButton.addEventListener('click', ()=>{
      const action = decreaseCounter(1); // Objeto accion
      store.dispatch(action);
    });

    // Ciclo de renderizado que se llama cada vez que se modifica el store.
    const render = () => {
      // get current state
      const state = store.getState();
      // update UI based on current state
      countLabel.innerHTML = state.count;
      increaseCounterButton.innerHTML = `+ (${state.increaseClicks})`;
      decreaseCounterButton.innerHTML = `+ (${state.decreaseClicks})`;   
    }

    render();
    store.subscribe(render);
    
