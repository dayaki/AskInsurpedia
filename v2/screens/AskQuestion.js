import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { Switch, AsyncStorage } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import PickerBox from "react-native-picker-box";
import { LoadingModal } from "../components/LoadingModal";
import { API_URL } from "../constants/Helper";

const AskQuestion = ({ navigation }) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [anon, setAnon] = useState(false);
  const [loading, setLoading] = useState(false);
  const picker = useRef(null);
  let user = [];

  AsyncStorage.getItem("userData").then(data => {
    user = JSON.parse(data);
  });

  const onSubmit = async () => {
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
        category: category,
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
        console.log("fetch", err);
      });
  };

  return (
    <>
      <LoadingModal
        visible={loading}
        onClose={() => setLoading(false)}
        loadingText="Please wait..."
      />
      {/* <Container
        contentContainerStyle={{ alignItems: "center", paddingTop: 30 }}
      > */}
      <Container>
        <Title>Ask your question here!</Title>
        <TextArea
          textAlignVertical="top"
          multiline={true}
          placeholder="Your question.."
          value={question}
          onChangeText={text => setQuestion(text)}
        />
        <Category
          activeOpacity={0.9}
          onPress={() => picker.current.openPicker()}
        >
          <Label>{category === "" ? "Select Category" : category}</Label>
          <AntDesign name="caretdown" size={12} color="#c8c88c" />
        </Category>
        <PickerBox
          ref={picker}
          data={[
            { label: "Insurance", value: "insurance" },
            { label: "Contracts and Liabilities", value: "contracts" },
            { label: "Annuity and Investments", value: "annuity" },
            { label: "Wills and Trust", value: "wills" },
            { label: "Pensions", value: "pensions" }
          ]}
          onValueChange={e => setCategory(e)}
          selectedValue={category}
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
    </>
  );
};

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
