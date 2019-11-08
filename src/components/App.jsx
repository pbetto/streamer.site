// Dependencies
import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
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
      streamInfo: {},
      userInfo: {},
      userFollowsInfo: {},
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
      .then(res => {
        this.setState({ userInfo: res.data.data[0] })
        axios
          .get(`${this.state.url}users/follows?first=1&to_id=${this.state.userInfo.id}`, {
            headers: { 'Client-ID': data.api_key },
          })
          .then(res => this.setState({ userFollowsInfo: res.data }))
          .catch(err => console.log(`Unable to fetch Twitch API ${err}`));
      })
      .catch(err => console.log(`Unable to fetch Twitch API ${err}`));
    document.title = `${data.twitch_channel} - ${data.site_title}`;
  }
  render() {
    const data = config.get();
    const GlobalStyle = createGlobalStyle`
    @import url("${props => props.fontUrl}");
    body {color: ${props => props.fontColor};}
    h1,h2 {display: inline-block;font-family: ${props => props.fontFamily};
    font-weight: ${props => props.fontWeight}; padding: 0; margin: 0;}
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
      <React.Fragment>
        <GlobalStyle fontUrl={data.font_url} fontColor={data.font_color} fontWeight={data.font_weight} fontFamily={data.brand_font} />
        <Background data={data}>
          <Content>
            <Header data={data} stream={this.state.streamInfo} />
            <Hero data={data} user={this.state.userInfo} follows={this.state.userFollowsInfo} stream={this.state.streamInfo} />
            <Footer data={data} />
          </Content>
        </Background>
      </React.Fragment>
    );
  }
}

export default App;
