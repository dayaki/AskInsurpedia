import React from "react";
import styled from "styled-components/native";
import moment from "moment";

const QuestionTags = ({ question, onTap, noTag }) => (
  <Wrapper>
    <Stat>
      Question asked {"   "}-{"  "}
      {moment.utc(question.created_at).fromNow()}
    </Stat>
    <QuestionBtn activeOpacity={0.8} onPress={onTap}>
      <Question>{question.question}</Question>
    </QuestionBtn>
    {!noTag && (
      <Tags>
        <Tag>
          <TagName>{question.category}</TagName>
        </Tag>
      </Tags>
    )}
  </Wrapper>
);

const Wrapper = styled.View`
  background: #fff;
  padding: 15px;
  margin-top: 5;
  border-bottom-color: rgba(229, 229, 229, 0.4);
  border-bottom-width: 1;
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
const Tags = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 5;
`;
const Tag = styled.View`
  background: #f5f5f5;
  padding: 4px;
`;
const TagName = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 10;
  color: #ababab;
  padding: 5px;
`;

export default QuestionTags;
