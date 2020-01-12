import React from "react";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";

const LoadingModal = ({ style }) => {
  return (
    <Container style={style}>
      <LottieView
        style={{
          width: 200,
          height: 200
        }}
        source={require("../assets/loading.json")}
        autoPlay
        loop
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export default LoadingModal;
