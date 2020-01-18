import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import HomeQuestion from "../components/HomeQuestion";

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [questions, setQuestions] = useState([]);
  let baseQuestions = null;

  useEffect(() => {
    AsyncStorage.getItem("questions").then(value => {
      if (value !== null) {
        console.log("base", JSON.parse(value).length);
        baseQuestions = JSON.parse(value);
        setQuestions(JSON.parse(value));
      }
    });
  }, []);

  const onSearch = text => {
    setSearchText(text);
    const searchTerm = text.toLowerCase();
    if (searchTerm === "") {
      //   setQuestions([]);
    } else {
      let filtered = questions.filter(
        el =>
          el.question.toLowerCase().includes(searchTerm) ||
          el.category.toLowerCase().includes(searchTerm)
      );
      console.log(filtered.length);
      setQuestions(filtered);
    }
  };

  const openLink = question => {
    navigation.navigate("HomeDetails", { question });
  };

  return (
    <Container>
      <Header>
        <CloseBtn activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Ionicons name="md-close" size={28} color="#3c4350" />
        </CloseBtn>
      </Header>

      <SearchInput
        placeholder="Search by question or category..."
        placeholderTextColor="#c8c8c8"
        clearButtonMode="while-editing"
        value={searchText}
        onChangeText={text => onSearch(text)}
      />

      {searchText !== "" && (
        <QuestionWrapper>
          {questions.map(question => (
            <HomeQuestion
              key={question.id}
              question={question}
              onTap={() => openLink(question)}
            />
          ))}
        </QuestionWrapper>
      )}
    </Container>
  );
};

const Container = styled.View`
  padding-top: 20;
`;
const Header = styled.View`
  justify-content: flex-start;
`;
const CloseBtn = styled.TouchableOpacity`
  padding: 20px;
`;
const SearchInput = styled.TextInput`
  align-self: center;
  color: #696d6f;
  width: 95%;
  border-bottom-color: #b7ce63;
  border-bottom-width: 2;
  padding-bottom: 5;
  padding-left: 5;
  margin-top: 20;
`;
const QuestionWrapper = styled.View`
  margin-top: 10;
`;

export default Search;
