import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import Toast from "react-native-easy-toast";
import { Switch, AsyncStorage, StyleSheet, View } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons
} from "@expo/vector-icons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { LoadingModal } from "../components";
import { API_URL } from "../constants/Helper";

const AskQuestion = ({ navigation }) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState([]);
  const [anon, setAnon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const toast = useRef(null);

  const categoryItems = [
    { name: "Insurance", id: 1 },
    { name: "Contracts and Liabilities", id: 2 },
    { name: "Annuity and Investments", id: 3 },
    { name: "Wills and Trust", id: 4 },
    { name: "Pensions", id: 5 }
  ];
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

  useEffect(() => {
    AsyncStorage.getItem("userData").then(data => {
      setUser(JSON.parse(data));
    });
  }, []);

  const onSubmit = async () => {
    const tempCategory = [];
    categoryItems.forEach(el => {
      if (category.includes(el.id)) {
        tempCategory.push(el.name);
      }
    });
    if (question === "" || question.length < 10) {
      toast.current.show("Length of your question is too small");
    } else if (tempCategory.length === 0) {
      toast.current.show("Please choose category for your question");
    } else {
      setLoading(true);
      const temp = await fetch(`${API_URL}questions/post`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: user.id,
          question: question,
          category: tempCategory.toString(),
          anonymous: anon
        })
      });

      const result = await temp.json();
      AsyncStorage.setItem("questions", JSON.stringify(result.data))
        .then(_ => {
          setLoading(false);
          navigation.goBack();
        })
        .catch(err => {
          setLoading(false);
          console.log("fetch", err);
        });
    }
  };

  return (
    <>
      <LoadingModal visible={loading} loadingText="Please wait..." />
      <Container>
        <Title>Ask your question here!</Title>
        <TextArea
          textAlignVertical="top"
          multiline={true}
          placeholder="Your question.."
          value={question}
          onChangeText={text => setQuestion(text)}
        />
        <SectionedMultiSelect
          styles={{
            item: { paddingVertical: 20 },
            selectToggle: {
              borderColor: "rgba(222, 222, 222, 0.5)",
              borderWidth: 1,
              marginVertical: 20,
              padding: 10,
              width: "95%"
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
          items={categoryItems}
          hideSearch
          single
          confirmText="Select Question's Category"
          showCancelButton
          uniqueKey="id"
          showChips={false}
          selectText="Select Category"
          onSelectedItemsChange={items => setCategory(items)}
          selectedItems={category}
        />
        <AskType>
          <Label>Ask Anonymously</Label>
          <Switch
            value={anon}
            onValueChange={v => {
              setAnon(v);
            }}
          />
        </AskType>
        <SubmitBtn activeOpacity={0.8} onPress={onSubmit}>
          <SubmitBtnText>Submit Question</SubmitBtnText>
        </SubmitBtn>
      </Container>
      <Close activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <Ionicons name="md-close" size={16} color="#000" />
      </Close>
      <Toast ref={toast} />
    </>
  );
};

{
  /* <Container
        contentContainerStyle={{ alignItems: "center", paddingTop: 30 }}
      > */
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 30;
`;
const Title = styled.Text`
  color: #151515;
  font-family: "sourcepro-bold";
  font-size: 18;
  margin-bottom: 10;
  opacity: 0.7;
`;
const TextArea = styled.TextInput`
  padding: 10px;
  border-color: rgba(222, 222, 222, 0.5);
  border-width: 1;
  width: 95%;
  height: 300;
`;
const Category = styled.TouchableOpacity`
  width: 95%;
  border-color: rgba(222, 222, 222, 0.5);
  border-width: 1;
  margin: 20px 0px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 15;
  color: rgb(121, 121, 121);
`;
const AskType = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 95%;
`;
const Close = styled.TouchableOpacity`
  background: rgba(216, 216, 216, 0.3);
  height: 50;
  align-items: center;
  justify-content: center;
`;
const SubmitBtn = styled.TouchableOpacity`
  background: #364f6b;
  border-radius: 25;
  margin-top: 30;
  width: 55%;
  height: 50;
  justify-content: center;
  align-items: center;
`;
const SubmitBtnText = styled.Text`
  font-size: 12;
  color: #fff;
  text-transform: uppercase;
`;

export default AskQuestion;
