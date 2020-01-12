import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components/native";
import { RefreshControl, AsyncStorage } from "react-native";
import QuestionTag from "../components/QuestionTags";
import LoadingModal from "../constants/LoadingModal";

const QuestionScreen = props => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchQuestions();
  }, [refreshing]);

  useEffect(() => {
    checkSavedQuestions();
  }, []);

  const checkSavedQuestions = () => {
    AsyncStorage.getItem("questions").then(data => {
      if (data !== null) {
        setQuestions(JSON.parse(data));
        fetchQuestions();
      } else {
        fetchQuestions();
      }
    });
  };

  const fetchQuestions = async () => {
    fetch("http://backend.askinsurpedia.ng/public/api/questions/all")
      .then(data => data.json())
      .then(results => {
        AsyncStorage.setItem("questions", JSON.stringify(results))
          .then(_ => {
            setQuestions(results);
            setRefreshing(false);
          })
          .catch(err => {
            console.log("fetch", err);
          });
      });
  };

  const openLink = question => {
    props.navigation.navigate("QuestionDetails", { question });
  };

  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {questions.length > 0 &&
        questions.map(question => (
          <QuestionTag
            key={question.id}
            question={question}
            onTap={() => openLink(question)}
          />
        ))}
      {questions.length === 0 && <LoadingModal />}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
`;

export default QuestionScreen;
