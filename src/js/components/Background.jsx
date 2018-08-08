import React, { Component } from 'react';
import styled from 'styled-components';
import YoutubeBackground from 'react-youtube-background'

class Background extends Component {
  render() {
    const BackgroundImage = styled.div`
    display: flex;
    background-image: url("${this.props.data.background_image}");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
   `;
    const BackgroundOverlay = styled.div`
    background-color: rgba(0, 0, 0, ${this.props.data.overlay_opacity});
    width: 100%;
    height: 100%;
   `;

    return (this.props.data.background_video ? (
      <YoutubeBackground
        videoId={this.props.data.background_video}
        overlay={`rgba(0, 0, 0, ${this.props.data.overlay_opacity})`}
      >
        {this.props.children}
      </YoutubeBackground>
    ) : (
      <BackgroundImage>
        <BackgroundOverlay>
          {this.props.children}
        </BackgroundOverlay>
      </BackgroundImage>
    ))
  }
}

export default Background;
