import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { AsyncStorage } from "react-native";
import Toast from "react-native-easy-toast";
import { API_URL } from "../constants/Helper";
import { LoadingModal, Input } from "../components";

const Register = ({ navigation }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const signup = () => {
    if (!fname || !lname || !email || !password) {
      toast.current.show("All fields are required.");
    } else {
      setLoading(true);
      fetch(`${API_URL}signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password
        })
      })
        .then(temp => temp.json())
        .then(data => {
          if (data.status === "success") {
            AsyncStorage.setItem("userData", JSON.stringify(data.data)).then(
              _ => {
                sendMail(data.data.email);
                setLoading(false);
                navigation.navigate("FirstTimeOptions");
              }
            );
          }
        })
        .catch(err => {
          setLoading(false);
          console.log("err", err);
        });
    }
  };

  const sendMail = async email => {
    const data = await fetch(`${API_URL}mail/later`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });
  };

  return (
    <Container>
      <LoadingModal
        visible={loading}
        onClose={() => setLoading(false)}
        loadingText="Creating your account..."
      />
      <Input
        label="First name"
        placeholder="First name"
        style={{ marginBottom: 50 }}
        value={fname}
        onChange={text => setFname(text)}
      />
      <Input
        label="Last name"
        placeholder="Last name"
        style={{ marginBottom: 50 }}
        value={lname}
        onChange={text => setLname(text)}
      />
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
      <Button activeOpacity={0.9} onPress={signup}>
        <ButtonText>Create an account</ButtonText>
      </Button>
      <Toast ref={toast} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: 20;
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

export default Register;
