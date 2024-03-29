// import { createStore } from 'redux';
import { legacy_createStore as createStore } from 'redux'
import rootReducer from './reducer'; // Assuming you have a rootReducer

const store = createStore(rootReducer); // Creating the Redux store

export default store;
