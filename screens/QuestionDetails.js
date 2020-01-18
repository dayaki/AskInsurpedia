import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import UserAvatar from "../components/UserAvatar";
import Avatar from "../components/Avatar";

const QuestionDetails = ({ navigation }) => {
  const [question, setQuestion] = useState(navigation.getParam("question"));
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("userData").then(data => {
      setUser(JSON.parse(data));
    });
    const didBlurSubscription = navigation.addListener("willFocus", () => {
      AsyncStorage.getItem("questions").then(data => {
        const result = JSON.parse(data).filter(el => el.id === question.id);
        setQuestion(result[0]);
      });
    });
  }, []);

  const newComment = () => {
    navigation.navigate("GiveAnswer", { question });
  };

  return (
    <>
      <Container>
        <QuestionWrapper>
          <Tags>
            <Tag>
              <TagName>{question.category}</TagName>
            </Tag>
          </Tags>
          <Question>{question.question}</Question>
          <UserAvatar
            user={question.user}
            time={question.created_at}
            type="asked"
            hidden={question.anonymous}
          />
          <QuestionText>{question.question}</QuestionText>
        </QuestionWrapper>
        <AnswerWrapper>
          {question.comments.length > 0 ? (
            <Comments>
              {question.comments.map(comment => (
                <Comment key={comment.id}>
                  <UserWrapper>
                    <Avatar source={comment.user.photo} />
                    <User>
                      <Name>
                        {comment.user.fname} {comment.user.lname}
                      </Name>
                      <Stamp>{moment.utc(comment.created_at).fromNow()}</Stamp>
                    </User>
                  </UserWrapper>
                  <QuestionText>{comment.comment}</QuestionText>
                </Comment>
              ))}
            </Comments>
          ) : (
            <NoAnswer>
              <Avatar source={user.photo} />
              <SubTitle>{user.fname}, can you answer this question?</SubTitle>
              <Text>
                People are searching for a better answer to this question.
              </Text>
              <NoAnswerBtn activeOpacity={0.8} onPress={newComment}>
                <NoAnswerBtnText>Answer</NoAnswerBtnText>
              </NoAnswerBtn>
            </NoAnswer>
          )}
        </AnswerWrapper>
      </Container>
      {question.comments.length > 0 && (
        <ReplyBtn activeOpacity={0.8} onPress={newComment}>
          <UserPhoto source={require("../assets/images/user-photo.png")} />
          <QuestionText>Add a reply...</QuestionText>
        </ReplyBtn>
      )}
      <Close activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <Ionicons name="md-close" size={26} color="#000" />
      </Close>
    </>
  );
};

const Container = styled.ScrollView`
  flex: 1;
`;
const QuestionWrapper = styled.View`
  padding: 30px 20px 6px 20px;
  border-bottom-color: rgba(222, 222, 222, 0.7);
  border-bottom-width: 5;
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
const Question = styled.Text`
  font-family: "open-sans";
  font-size: 18;
  font-weight: 700;
  line-height: 23;
  margin-top: 10;
  margin-bottom: 7;
`;
const QuestionText = styled.Text`
  font-family: "song-myung";
  font-size: 15;
  font-weight: normal;
  color: #393939;
  margin: 10px 0px;
`;
const AnswerWrapper = styled.View`
  /* padding-top: 3; */
`;
const NoAnswer = styled.View`
  align-items: center;
  margin-top: 20;
`;
const SubTitle = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 15;
  color: #191717;
  margin-top: 5px;
  width: 70%;
  text-align: center;
`;
const Text = styled.Text`
  color: #4c4444;
  font-family: "sourcepro-regular";
  font-size: 12;
  font-weight: 400;
  margin-top: 3px;
  width: 60%;
  text-align: center;
`;
const NoAnswerBtn = styled.TouchableOpacity`
  margin-top: 15;
  background: #f0f8ff;
`;
const NoAnswerBtnText = styled.Text`
  text-transform: capitalize;
  color: #488aff;
  padding: 10px 40px;
  height: auto;
  font-family: "song-myung";
  font-size: 13;
`;
const Close = styled.TouchableOpacity`
  background: rgba(216, 216, 216, 0.3);
  height: 50;
  align-items: center;
  justify-content: center;
`;
const Comments = styled.View`
  padding: 5px 20px;
`;
const Comment = styled.View``;
const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8;
`;
const User = styled.View`
  padding-left: 5;
`;
const Name = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 15;
  color: #575757;
`;
const Stamp = styled.Text`
  font-size: 12;
  font-family: "sourcepro-regular";
  color: #95989a;
`;
const ReplyBtn = styled.TouchableOpacity`
  flex-direction: row;
  background: rgba(183, 183, 183, 0.1);
  padding: 5px;
  padding-left: 10px;
  margin-bottom: 2px;
  border-top-color: rgba(222, 222, 222, 0.4);
  border-top-width: 1;
  border-bottom-color: rgba(222, 222, 222, 0.4);
  border-bottom-width: 1;
  align-items: center;
`;
const UserPhoto = styled.Image`
  width: 25;
  height: 25;
  border-radius: 15;
  margin-right: 10;
`;

export default QuestionDetails;
