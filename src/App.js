import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


export default class App extends Component {
  pageSize = 10;
  apiKey = 'd6bf9be4746d4658bf85e88cb574359f';
  country = 'in';
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Switch>
          <Route exact path="/"><News key="home" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="technology"/></Route>
          <Route exact path="/about"><News key="about" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="technology"/></Route>
          <Route exact path="/business"><News key="business" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="business"/></Route>              
          <Route exact path="/entertainment"><News key="entertainment" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="entertainment"/></Route>        
          <Route exact path="/general"><News key="general" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="general"/></Route>        
          <Route exact path="/health"><News key="health" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="health"/></Route>        
          <Route exact path="/science"><News key="science" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="science"/></Route>        
          <Route exact path="/sports"><News key="sports" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="sports"/></Route>        
          <Route exact path="/technology"><News key="technology" pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category="technology"/></Route>        
        </Switch>
          
        </Router>
      </div>
    )
  }
}

