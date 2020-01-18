import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  AntDesign
} from "@expo/vector-icons";
import { Input, LoadingModal } from "../components";
import { API_URL } from "../constants/Helper";

const BeExpert = ({ navigation }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [specialty, setSpecialty] = useState([]);
  const [experience, setExperience] = useState([]);
  const [consult, setConsult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const icon = ({ name, size = 18, style }) => {
    const flat = StyleSheet.flatten(style);
    const { color, fontSize, ...styles } = flat;
    let iconComponent;
    const Down = <FontAwesome name="caret-down" size={20} color="#c3c3c3" />;
    const Close = <MaterialCommunityIcons name="close" size={24} color="red" />;
    const Check = <MaterialCommunityIcons name="check" size={24} color="red" />;
    const Cancel = (
      <MaterialCommunityIcons name="close" size={24} color="#fff" />
    );

    switch (name) {
      case "keyboard-arrow-down":
        iconComponent = Down;
        break;
      case "close":
        iconComponent = Close;
        break;
      case "check":
        iconComponent = Check;
        break;
      case "cancel":
        iconComponent = Cancel;
        break;
      default:
        iconComponent = null;
        break;
    }
    return <View style={styles}>{iconComponent}</View>;
  };

  const specialtyItems = [
    { name: "Insurance", id: 1 },
    { name: "Annuity and Investments", id: 2 },
    { name: "Contracts and Liabilities", id: 3 },
    { name: "Wills and Trusts", id: 4 },
    { name: "Pensions", id: 5 }
  ];
  const experienceItems = [
    { name: "1 - 3 Years", id: 1 },
    { name: "4 - 6 Years", id: 2 },
    { name: "7 years above", id: 3 }
  ];
  const consultItems = [
    { name: "Yes", id: 1 },
    { name: "No", id: 2 }
  ];

  const signup = async () => {
    const tempSpecialty = [];
    const tempExperience = [];
    const tempConsult = [];
    if (
      name === "" ||
      bio === "" ||
      specialty.length < 1 ||
      experience.length < 1 ||
      consult.length < 1
    ) {
      toast.current.show("Please all fields are required.");
    } else {
      setLoading(true);
      specialtyItems.forEach(el => {
        if (specialty.includes(el.id)) {
          tempSpecialty.push(el.name);
        }
      });
      experienceItems.forEach(el => {
        if (experience.includes(el.id)) {
          tempExperience.push(el.name);
        }
      });
      consultItems.forEach(el => {
        if (consult.includes(el.id)) {
          tempConsult.push(el.name);
        }
      });
      fetch(`${API_URL}bexpert`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          specialty: tempSpecialty.toString(),
          experience: tempExperience.toString(),
          consultant: tempConsult.toString(),
          bio
        })
      })
        .then(status => status.json())
        .then(data => {
          setName("");
          setBio("");
          setSpecialty([]);
          setExperience([]);
          setConsult([]);
          setLoading(false);
          toast.current.show("Message sent, we will get back you ASAP.");
          // navigation.goBack();
        })
        .catch(err => {
          setLoading(false);
          console.log("err", err);
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
      <SectionedMultiSelect
        styles={{
          item: { paddingVertical: 20 },
          selectToggle: {
            borderBottomColor: "#dedede",
            borderBottomWidth: 1,
            marginBottom: 55,
            paddingBottom: 10
          },
          selectToggleText: {
            fontFamily: "sourcepro-regular",
            color: "#222",
            opacity: 0.7
          },
          button: {
            paddingVertical: 15
          }
        }}
        iconRenderer={icon}
        items={specialtyItems}
        hideSearch
        confirmText="Choose Specialties"
        showCancelButton
        uniqueKey="id"
        showChips={false}
        selectText="Specialty"
        onSelectedItemsChange={items => setSpecialty(items)}
        selectedItems={specialty}
      />
      <SectionedMultiSelect
        styles={{
          item: { paddingVertical: 20 },
          selectToggle: {
            borderBottomColor: "#dedede",
            borderBottomWidth: 1,
            marginBottom: 55,
            paddingBottom: 10
          },
          selectToggleText: {
            fontFamily: "sourcepro-regular",
            color: "#222",
            opacity: 0.7
          },
          button: {
            paddingVertical: 15
          }
        }}
        iconRenderer={icon}
        items={experienceItems}
        hideSearch
        single
        confirmText="Your Experience"
        showCancelButton
        uniqueKey="id"
        showChips={false}
        selectText="Years of Experience"
        onSelectedItemsChange={items => setExperience(items)}
        selectedItems={experience}
      />
      <SectionedMultiSelect
        styles={{
          item: { paddingVertical: 20 },
          selectToggle: {
            borderBottomColor: "#dedede",
            borderBottomWidth: 1,
            marginBottom: 55,
            paddingBottom: 10
          },
          selectToggleText: {
            fontFamily: "sourcepro-regular",
            color: "#222",
            opacity: 0.7
          },
          button: {
            paddingVertical: 15
          }
        }}
        iconRenderer={icon}
        items={consultItems}
        hideSearch
        single
        confirmText="Be a Consultant"
        showCancelButton
        uniqueKey="id"
        showChips={false}
        selectText="Register as a Consultant"
        onSelectedItemsChange={items => setConsult(items)}
        selectedItems={consult}
      />
      {/* <Category
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
      </Category> */}
      <Input label="A Brief Bio" value={bio} onChange={text => setBio(text)} />
      <Button activeOpacity={0.9} onPress={signup}>
        <ButtonText>Submit</ButtonText>
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
