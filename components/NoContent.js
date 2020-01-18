import React from "react";
import styled from "styled-components/native";

const NoContent = ({ text }) => <Text>{text}.</Text>;
const Text = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 16;
  color: rgb(31, 30, 30);
  margin-top: 50;
  text-align: center;
`;
export default NoContent;
