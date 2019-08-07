import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Datepicker from './components/datepicker';
import Summary from './components/summary';
import DetailClock from './components/detailclock';
import Paging from './components/paging';
import Footer from './components/footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Datepicker />
        <Summary />
        <DetailClock />
        <Paging />
        <Footer />
      </div>
    );
  }
}

export default App;
