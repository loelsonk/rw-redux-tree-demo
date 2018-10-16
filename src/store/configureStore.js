import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import privilegesReducer from './reducer';

const rootReducer = combineReducers({
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer,
    privileges: privilegesReducer,
});

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);