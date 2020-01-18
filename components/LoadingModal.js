import React from "react";
import { Modal, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import Lottie from "lottie-react-native";

const LoadingModal = ({ visible, loadingText, onClose }) => (
  <SafeAreaView>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalWrapper>
        <Loading>
          <Lottie
            source={require("../assets/stopwatch.json")}
            style={{
              width: 200,
              height: 200
            }}
            autoPlay
            loop
          />
          <LoadingText>{loadingText}</LoadingText>
        </Loading>
      </ModalWrapper>
    </Modal>
  </SafeAreaView>
);

const ModalWrapper = styled.View`
  flex: 1;
  align-items: center;
  height: 100%;
  background-color: rgba(43, 34, 71, 0.85);
`;
const Loading = styled.View`
  align-self: center;
  align-items: center;
  position: absolute;
  top: 35%;
`;
const LoadingText = styled.Text`
  font-family: "sourcepro-bold";
  font-size: 13;
  color: #fff;
  margin-top: -40;
`;

export default LoadingModal;
