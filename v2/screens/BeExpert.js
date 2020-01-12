import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import PickerBox from "react-native-picker-box";
import Toast, { DURATION } from "react-native-easy-toast";
import { AntDesign } from "@expo/vector-icons";
import { Input, LoadingModal } from "../components";
import { API_URL } from "../constants/Helper";

const BeExpert = ({ navigation }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [consult, setConsult] = useState("");
  const [loading, setLoading] = useState(false);
  const picker1 = useRef(null);
  const picker2 = useRef(null);
  const picker3 = useRef(null);
  const toast = useRef(null);

  const signup = () => {
    if (
      name === "" ||
      bio === "" ||
      specialty === "" ||
      experience === "" ||
      consult === ""
    ) {
      toast.current.show("Please all fields are required.");
    } else {
      console.log(name);
      setLoading(true);

      fetch(`${API_URL}bexpert"`, {
        method: "post",
        body: JSON.stringify({
          name,
          specialty: specialty.toString(),
          experience,
          consultant: consult,
          bio
        })
      })
        .then(status => status.json())
        .then(data => {
          setLoading(false);
          toast.current.show("Message sent, we will get back you ASAP.");
          navigation.goBack();
        });
    }
  };

  return (
    <Container>
      <LoadingModal
        visible={loading}
        onClose={() => setLoading(false)}
        loadingText="Please wait..."
      />
      <Input
        label="Name"
        style={{ marginBottom: 50 }}
        value={name}
        onChange={text => setName(text)}
      />
      <Category
        activeOpacity={0.9}
        onPress={() => picker1.current.openPicker()}
        style={{ marginTop: -20 }}
      >
        <Label>{specialty === "" ? "Specialty" : specialty}</Label>
        <AntDesign name="caretdown" size={12} color="#c8c88c" />
      </Category>
      <Category
        activeOpacity={0.9}
        onPress={() => picker2.current.openPicker()}
      >
        <Label>{experience === "" ? "Years of Experience" : experience}</Label>
        <AntDesign name="caretdown" size={12} color="#c8c88c" />
      </Category>
      <Category
        activeOpacity={0.9}
        onPress={() => picker3.current.openPicker()}
        style={{ marginBottom: 40 }}
      >
        <Label>{consult === "" ? "Register as a Consultant?" : consult}</Label>
        <AntDesign name="caretdown" size={12} color="#c8c88c" />
      </Category>
      <Input label="A Brief Bio" value={bio} onChange={text => setBio(text)} />
      <Button activeOpacity={0.9} onPress={signup}>
        <ButtonText>Submit</ButtonText>
      </Button>
      <PickerBox
        ref={picker1}
        data={[
          { label: "Insurance", value: "Insurance" },
          {
            label: "Annuity and Investments",
            value: "Annuity and Investments"
          },
          {
            label: "Contracts and Liabilities",
            value: "Contracts and Liabilities"
          },
          { label: "Wills and Trust", value: "Wills and Trust" },
          { label: "Pensions", value: "Pensions" }
        ]}
        onValueChange={e => setSpecialty(e)}
        selectedValue={specialty}
      />
      <PickerBox
        ref={picker2}
        data={[
          { label: "1 - 3 Years", value: "1 - 3 Years" },
          { label: "4 - 6 Years", value: "4 - 6 Years" },
          { label: "7 years above", value: "7 years above" }
        ]}
        onValueChange={e => setExperience(e)}
        selectedValue={experience}
      />
      <PickerBox
        ref={picker3}
        data={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" }
        ]}
        onValueChange={e => setConsult(e)}
        selectedValue={consult}
      />
      <Toast ref={toast} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: 20;
`;
const Category = styled.TouchableOpacity`
  border-bottom-color: #dedede;
  border-bottom-width: 1;
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
`;
const Label = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 15;
  color: rgb(121, 121, 121);
`;
const Button = styled.TouchableOpacity`
  background: #fc5185;
  width: 70%;
  height: 50;
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

export default BeExpert;
