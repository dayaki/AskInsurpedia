import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast, { DURATION } from "react-native-easy-toast";
import LoadingModal from "../components/LoadingModal";
import { API_URL } from "../constants/Helper";

const GiveAnswer = ({ navigation }) => {
  const question = navigation.getParam("question");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem("userData").then(data => {
      setUser(JSON.parse(data));
    });
  }, []);

  const onSubmit = async () => {
    if (comment === "") {
      toast.current.show("Sorry, your answer can not be blank.");
    } else {
      setLoading(true);
      const temp = await fetch(`${API_URL}questions/comment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: user.id,
          question: question.id,
          comment: comment
        })
      });
      const result = await temp.json();
      AsyncStorage.setItem("questions", JSON.stringify(result))
        .then(_ => {
          setLoading(false);
          navigation.goBack();
        })
        .catch(err => {
          console.log("fetch", err);
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
      <Header>
        <CloseBtn activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Ionicons name="md-close" size={25} color="rgb(121, 11, 11)" />
        </CloseBtn>
        <Title>Give an Answer</Title>
        <SubmitBtn activeOpacity={0.8} onPress={onSubmit}>
          <SubmitBtnText>Submit</SubmitBtnText>
        </SubmitBtn>
      </Header>
      <Question>{question.question}</Question>
      <Line />
      <TextArea
        autoFocus
        textAlignVertical="top"
        multiline={true}
        placeholder="Write your answer..."
        value={comment}
        onChangeText={text => setComment(text)}
      />
      <Toast ref={toast} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 30;
`;
const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom-color: rgba(206, 206, 206, 0.6);
  border-bottom-width: 1;
`;
const CloseBtn = styled.TouchableOpacity`
  padding: 5px;
`;
const Title = styled.Text`
  font-family: "song-myung";
  font-size: 14;
  color: rgb(163, 163, 163);
`;
const SubmitBtn = styled.TouchableOpacity`
  padding: 5px;
  /* background: rgb(121, 11, 11);
  padding: 6px 15px;
  border-radius: 10; */
`;
const SubmitBtnText = styled.Text`
  font-family: "song-myung";
  color: rgb(121, 11, 11);
`;
const Question = styled.Text`
  font-family: "song-myung";
  font-size: 18;
  font-weight: 600;
  color: #000;
  padding: 10px;
`;
const Line = styled.View`
  border-bottom-color: #efefef;
  border-bottom-width: 1;
  height: 1;
`;
const TextArea = styled.TextInput`
  padding: 10px;
`;

export default GiveAnswer;
