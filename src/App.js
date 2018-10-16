import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import './App.css';
import Tree from './Tree';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div>
                <div style={{ height: '500px' }}>
                    <Tree />
                </div>
            </div>
        </Provider>
    );
  }
}

export default App;
