import React, { useState } from "react";
import styled from "styled-components/native";
import Input from "../components/Input";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    // if (!email || !password) {
    // } else {
    //   alert(email);
    // }
    navigation.navigate("Main");
  };

  return (
    <Container>
      <Input
        label="Email"
        placeholder="Email address"
        style={{ marginBottom: 50 }}
        value={email}
        onChange={text => setEmail(text)}
      />
      <Input
        label="Password"
        placeholder="********"
        type="password"
        value={password}
        onChange={text => setPassword(text)}
      />
      <Button activeOpacity={0.9} onPress={login}>
        <ButtonText>Log in</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: 40;
`;
const Button = styled.TouchableOpacity`
  background: #364f6b;
  width: 70%;
  height: 60;
  margin-top: 50;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
  font-family: "sourcepro-regular";
  font-size: 18;
`;

export default Login;
