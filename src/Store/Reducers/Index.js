import { combineReducers } from 'redux';

function init(state = [], action) {

    let copy = null;

    switch(action.type) {

        default:
            return state;
    }
}

// combinamos nuestros reducers
// los keys que usemos para nuestros reducers
// van a ser usados como keys en nuestro store
// en este ejemplo sería: { todos: [], }
const Reducers = combineReducers({
    init,
});

export default Reducers;
