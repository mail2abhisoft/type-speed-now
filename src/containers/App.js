import React, { Component } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { Content } from '../components/Content';

class App extends Component {

  render() {
    return (
      <div>
        {/* <div class="loader">Loading...</div> */}
        <div id="cover-spin"></div>
        <Header />
        <div style={{ display: 'flex', marginTop: '88px' }}>
          <Sidebar />
          <Content />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
