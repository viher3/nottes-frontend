import { createStore } from 'redux';
import reducers from 'Store/Reducers/Index';

// definimos el estado inicial
const initialState = {

};

// creamos el store
const Store = createStore(reducers, initialState);

export default Store;
