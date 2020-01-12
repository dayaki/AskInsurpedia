import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { AsyncStorage } from "react-native";
import { NoContent, QuestionTags } from "../components";

const MyActivity = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("questions").then(data => {
      const questionss = JSON.parse(data);
      AsyncStorage.getItem("userData").then(value => {
        const user = JSON.parse(value);
        const result = questionss.filter(el => el.user_id == user.id);
        result.length > 0 ? setQuestions(result) : setQuestions([]);
      });
    });
  });

  const openLink = question => {
    navigation.navigate("Details", { question });
  };

  return (
    <Container>
      {questions.length > 0 ? (
        questions.map(question => (
          <QuestionTags
            key={question.id}
            question={question}
            onTap={() => openLink(question)}
            noTag
          />
        ))
      ) : (
        <NoContent text="You have no activities, start by asking some questions." />
      )}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
`;

export default MyActivity;
