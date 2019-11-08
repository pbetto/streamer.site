import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
  margin: 1em;
  width: calc(3vw + 150px);
  border-radius: 12px;
`;

const ChannelLogo = props => <Logo src={props.user.profile_image_url} alt="" />;

export default ChannelLogo;
