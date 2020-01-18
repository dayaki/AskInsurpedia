import React from "react";
import styled from "styled-components/native";
// import HTML from "react-native-render-html";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import UserAvatar from "../components/UserAvatar";

const HomeQuestions = ({ question, onTap }) => (
  <Wrapper>
    <Stat>
      Question asked {"   "}-{"  "} {moment.utc(question.created_at).fromNow()}
    </Stat>
    <QuestionBtn activeOpacity={0.8} onPress={onTap}>
      <Question>{question.question}</Question>
    </QuestionBtn>
    {question.comments.length === 0 ? (
      <NoAnswerWrapper>
        <NoAnswer>No answer yet.</NoAnswer>
        <NoAnswerBtn activeOpacity={0.8} onPress={onTap}>
          <Ionicons name="md-create" size={20} color="#0a8185" />
          <NoAnswerBtnText>Answer</NoAnswerBtnText>
        </NoAnswerBtn>
      </NoAnswerWrapper>
    ) : (
      question.comments.map((comment, index) => (
        <GotAnswer key={index}>
          <UserAvatar
            user={comment.user}
            time={comment.created_at}
            hidden="0"
          />
          <AnswerText>{comment.comment}</AnswerText>
          {/* <HTML
            html={comment.comment}
            containerStyle={{ marginTop: 15 }}
            baseFontStyle={{
              fontSize: 15,
              color: "#393939",
              fontFamily: "song-myung"
            }}
          /> */}
        </GotAnswer>
      ))
    )}
  </Wrapper>
);

const Wrapper = styled.View`
  background: #fff;
  padding: 15px;
  margin-top: 5;
`;
const Stat = styled.Text`
  color: #989898;
  font-family: "open-sans";
  font-size: 13;
`;
const QuestionBtn = styled.TouchableOpacity``;
const Question = styled.Text`
  font-family: "open-sans";
  font-size: 18;
  font-weight: 700;
  line-height: 23;
  margin-top: 6;
`;
const NoAnswerWrapper = styled.View`
  margin-top: 5;
`;
const NoAnswer = styled.Text`
  font-family: "open-sans";
  font-size: 15;
  color: #393939;
`;
const NoAnswerBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #dedede;
  width: 100;
  padding: 5px 0px;
  margin-top: 5;
`;
const NoAnswerBtnText = styled.Text`
  font-weight: bold;
  text-transform: capitalize;
  color: #393939;
  padding-left: 3;
`;
const GotAnswer = styled.View``;
const AnswerText = styled.Text`
  font-family: "song-myung";
  font-size: 15;
  color: #393939;
  margin-top: 7;
`;

export default HomeQuestions;
