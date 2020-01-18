import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "../constants/Helper";
import { LoadingModal } from "../components";
import Toast, { DURATION } from "react-native-easy-toast";

const ForgotPass = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const onSubmit = () => {
    if (email !== "") {
      setLoading(true);
      fetch(`${API_URL}forgotpass`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })
        .then(temp => temp.json())
        .then(data => {
          setLoading(false);
          if (data.status === "error") {
            toast.current.show("Sorry, no user with this email address.", 1500);
          } else {
            toast.current.show(
              "Kindly check your email for our password recovery email.",
              2000
            );
          }
          console.log(data);
          setEmail("");
        })
        .catch(err => {
          setLoading(false);
        });
    }
  };

  return (
    <Container>
      <LoadingModal visible={loading} loadingText="Verifying your details..." />
      <Icon>
        <AntDesign name="lock" size={80} color="rgba(0,0,0,0.8)" />
      </Icon>
      <Title>Please enter your registered email ID</Title>
      <SubTitle>
        We will send a temporary password to your registered email ID
      </SubTitle>
      <Input
        placeholder="Email address"
        placeholderTextColor="#c2c2c2"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <Button activeOpacity={0.8} onPress={onSubmit}>
        <ButtonText>Reset Password</ButtonText>
      </Button>
      <Toast ref={toast} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;
const Icon = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 50;
  margin-top: 50;
`;
const Title = styled.Text`
  font-family: "open-sans";
  font-size: 18;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 5;
`;
const SubTitle = styled(Title)`
  font-family: "sourcepro-regular";
  font-size: 16;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 30;
`;
const Input = styled.TextInput`
  border: 1px solid rgba(200, 200, 200, 0.2);
  height: 50;
  background: rgba(200, 200, 200, 0.2);
  padding-left: 10;
  margin: 20px 0px;
`;
const Button = styled.TouchableOpacity`
  background: #364f6b;
  width: 100%;
  height: 50;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 3;
  margin-top: 10;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
  font-family: "sourcepro-regular";
  font-size: 16;
`;

export default ForgotPass;
