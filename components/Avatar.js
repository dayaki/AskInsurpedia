import React from "react";
import styled from "styled-components/native";

const Avatar = props => (
  <Image
    source={
      props.source
        ? { uri: props.source }
        : require("../assets/images/user-photo.png")
    }
  />
);

const Image = styled.Image`
  width: 40;
  height: 40;
  border-radius: 20;
`;

export default Avatar;
