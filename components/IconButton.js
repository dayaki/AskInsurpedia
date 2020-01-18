import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, text, bgcolor, iconcolor, onTap }) => (
  <Button
    activeOpacity={0.9}
    style={{ backgroundColor: bgcolor }}
    onPress={onTap}
  >
    <Ionicons name={icon} size={32} color={iconcolor} />
    {bgcolor === "#fff" ? (
      <Text style={{ color: "#494949" }}>{text}</Text>
    ) : (
      <Text style={{ color: "#fff" }}>{text}</Text>
    )}
  </Button>
);

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 60;
  margin-bottom: 15px;
  padding-left: 15px;
`;
const Text = styled.Text`
  text-transform: uppercase;
  padding-left: 10;
  font-family: "open-sans";
  font-size: 16;
  font-weight: bold;
  margin-left: 10px;
`;

export default IconButton;
