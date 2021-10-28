import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={5} apiKey="d6bf9be4746d4658bf85e88cb574359f" country="in" category="technology"/>
      </div>
    )
  }
}

