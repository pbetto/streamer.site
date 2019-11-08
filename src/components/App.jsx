// Dependencies
import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import axios from 'axios';

// Components
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import Background from './Background';

import * as config from '../config';

// Global Styles

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://api.twitch.tv/helix/',
      streamInfo: [],
      userInfo: [],
    };
  }
  async componentDidMount() {
    await config.init();
    const data = config.get();
    axios
      .get(`${this.state.url}streams?user_login=${data.twitch_channel}`, {
        headers: { 'Client-ID': data.api_key },
      })
      .then(res => this.setState({ streamInfo: res.data.data }))
      .catch(err => console.log(`Unable to fetch Twitch API ${err}`));
    axios
      .get(`${this.state.url}users?login=${data.twitch_channel}`, {
        headers: { 'Client-ID': data.api_key },
      })
      .then(res => this.setState({ userInfo: res.data.data[0] }))
      .catch(err => console.log(`Unable to fetch Twitch API ${err}`));
    document.title = `${data.twitch_channel} - ${data.site_title}`;
  }
  render() {
    const data = config.get();
    injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Roboto:500');
    @import url("${data.font_url}");
    body {color: ${data.font_color};}
    * {box-sizing: border-box;}
    html,body {margin: 0;padding: 0;background: #000;font-family: 'Roboto', sans-serif; font-weight: 500;overflow-x: hidden;}
    h1,h2 {display: inline-block;font-family: ${data.brand_font};font-weight: ${
  data.font_weight
}; padding: 0; margin: 0;}
    p {margin: 0;padding: 0;}
    .container {width: calc(100% - 4em);max-width: 1600px;margin: 0 auto;}
    #hero {display: flex;flex-direction: column;justify-content: center;align-items: center;}
    .centered {text-align: center;}
  `;
    const Content = styled.div`
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    width: 100%;
  `;
    if (data === '') {
      return null;
    }
    return (
      <Background data={data}>
        <Content>
          <Header data={data} stream={this.state.streamInfo} />
          <Hero data={data} user={this.state.userInfo} stream={this.state.streamInfo} />
          <Footer data={data} />
        </Content>
      </Background>
    );
  }
}

export default App;
