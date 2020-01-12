import React, { useState } from "react";
import styled from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../components/Input";

const CoverRisk = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());

  const postUpdate = () => {
    console.log("date", date);
  };

  return (
    <Container>
      <Input
        label="Name"
        style={{ marginBottom: 50 }}
        value={name}
        onChange={text => setName(text)}
      />
      <Input
        label="Phone"
        style={{ marginBottom: 50 }}
        value={phone}
        onChange={text => setPhone(text)}
      />
      <Input
        label="Email"
        style={{ marginBottom: 50 }}
        value={email}
        onChange={text => setEmail(text)}
      />
      <Box>
        <Label>Prefered Contact Time</Label>
        <DateTimePicker
          value={date}
          is24Hour={true}
          minimumDate={new Date()}
          display="default"
          onChange={(event, date) => setDate(date)}
        />
      </Box>
      <Button activeOpacity={0.9} onPress={postUpdate}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: 20;
`;
const Box = styled.View``;
const Label = styled.Text`
  font-family: "sourcepro-regular";
  color: #222;
  opacity: 0.7;
`;
const Button = styled.TouchableOpacity`
  background: #fc5185;
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
  text-transform: uppercase;
`;

export default CoverRisk;
