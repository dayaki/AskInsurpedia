import React, { useState, useRef } from "react";
import { AsyncStorage } from "react-native";
import Toast from "react-native-easy-toast";
import styled from "styled-components/native";
import { API_URL } from "../constants/Helper";
import { LoadingModal, Input } from "../components";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const login = () => {
    if (email === "" || password === "") {
      toast.current.show("Username and password is required.");
    } else {
      setLoading(true);
      fetch(`${API_URL}login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
        .then(temp => temp.json())
        .then(data => {
          setLoading(false);
          if (data.status === "error") {
            setLoading(false);
            toast.current.show("Invalid username or password");
          } else {
            AsyncStorage.setItem("userData", JSON.stringify(data.data)).then(
              _ => {
                setLoading(false);
                navigation.navigate("Main");
              }
            );
          }
        })
        .catch(err => {
          setLoading(false);
          toast.current.show("Network Error, please try again later.");
        });
    }
  };

  const forgotPass = () => {
    navigation.navigate("ForgotPass");
  };

  return (
    <Container>
      <LoadingModal visible={loading} loadingText="Authenticating..." />
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
      <ForgotPass activeOpacity={0.8} onPress={forgotPass}>
        <ForgotPassText>Forgot your password?</ForgotPassText>
      </ForgotPass>
      <Toast ref={toast} />
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
const ForgotPass = styled.TouchableOpacity`
  /* border-bottom-color: #c8c8c8;
  border-bottom-width: 1; */
  padding-bottom: 3;
  width: 70%;
  align-self: center;
  margin-top: 30;
`;
const ForgotPassText = styled.Text`
  font-family: "open-sans";
  font-size: 14;
  color: red;
  opacity: 0.4;
  text-align: center;
`;

export default Login;
