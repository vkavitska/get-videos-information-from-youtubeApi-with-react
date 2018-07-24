import React, { Component } from 'react';
import { render } from 'react-dom';
import VideosListPage from './components/VideosListPage.js';
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import VideoInfoPage from './components/VideoInfoPage.js'
import store from './redux/store.js'
import AppBar from './components/AppBar.js'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar/>
        <Route exact path="/" component={VideosListPage} />
        <Route path="/video/:id" component={VideoInfoPage} />
      </div>
    );
  }
}

render(
      <BrowserRouter>
        <Provider store={store}> 
          <App/>
        </Provider>
      </BrowserRouter>, 
      document.getElementById('root')
);

