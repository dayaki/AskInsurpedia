import React from "react";
import styled from "styled-components/native";

const LoadingModal = ({ style }) => {
  return <Container style={style}></Container>;
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export default LoadingModal;
