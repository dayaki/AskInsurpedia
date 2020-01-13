import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import Toast from "react-native-easy-toast";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { Input, LoadingModal } from "../components";
import { API_URL } from "../constants/Helper";

const CoverRisk = ({ navigation }) => {
  const [name, setName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
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

  const risks = [
    { name: "Automobile", id: 1 },
    { name: "Property", id: 2 },
    { name: "Contracts and Liabilities", id: 3 },
    { name: "Life and Investments", id: 4 },
    { name: "Wills and Trusts", id: 5 },
    { name: "Pensions", id: 6 }
  ];

  const onSelectedItemsChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  const postUpdate = () => {
    if (
      name === "" ||
      phone === "" ||
      email === "" ||
      selectedItems.length < 1
    ) {
      toast.current.show("Sorry, you need to fill in all fields.");
    } else {
      setLoading(true);
      const tempRisks = [];
      risks.forEach(el => {
        if (selectedItems.includes(el.id)) {
          tempRisks.push(el.name);
        }
      });
      fetch(`${API_URL}risks`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          contact: moment.utc(date).format("DD MMMM"),
          risks: tempRisks.toString()
        })
      })
        .then(temp => temp.json())
        .then(data => {
          console.log(data);
          setName("");
          setEmail("");
          setPhone("");
          setSelectedItems([]);
          setLoading(false);
          toast.current.show("Message sent, we will get back to you ASAP.");
        })
        .catch(err => {
          setLoading(false);
          console.log("err", err);
        });
    }
  };

  return (
    <Container contentContainerStyle={{ padding: 25, paddingTop: 20 }}>
      <LoadingModal loadingText="Please wait..." visible={loading} />
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
            marginBottom: 30,
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
        items={risks}
        hideSearch
        confirmText="Select Risks"
        showCancelButton
        uniqueKey="id"
        showChips={false}
        selectText="Risks you want to cover"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
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
      <Box activeOpacity={0.8} onPress={() => setShowPicker(true)}>
        <Label>Prefered Contact Time</Label>
        <Ionicons name="md-calendar" size={18} color="#222" />
      </Box>
      {showPicker && (
        <DateTimePicker
          value={date}
          is24Hour={true}
          minimumDate={new Date()}
          display="default"
          onChange={(event, date) => setDate(date)}
        />
      )}
      <Button activeOpacity={0.9} onPress={postUpdate}>
        <ButtonText>Submit</ButtonText>
      </Button>
      <Toast ref={toast} />
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
`;
const Box = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
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
