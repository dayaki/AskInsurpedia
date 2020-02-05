import React from "react";
import styled from "styled-components/native";

const Input = props => (
  <InputWrapper style={props.style}>
    <Label>{props.label}</Label>
    <TextInput
      placeholder={props.placeholder}
      secureTextEntry={props.type === "password" ? true : false}
      autoCapitalize="none"
      keyboardType={props.type === "email" ? "email-address" : "default"}
      value={props.value}
      onChangeText={props.onChange}
    />
  </InputWrapper>
);

const InputWrapper = styled.View``;
const Label = styled.Text`
  font-family: "sourcepro-regular";
  color: #222;
  opacity: 0.7;
`;
const TextInput = styled.TextInput`
  font-family: "sourcepro-regular";
  margin-top: 15;
  padding-bottom: 15;
  border-bottom-color: #dedede;
  border-bottom-width: 1;
`;

export default Input;
