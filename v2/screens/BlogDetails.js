import React from "react";
import styled from "styled-components/native";
import * as Sharing from "expo-sharing";
import HTML from "react-native-render-html";

const BlogDetails = ({ navigation }) => {
  const article = navigation.getParam("article");
  console.log(navigation.state.params.article);
  return (
    <Container showsVerticalScrollIndicator={false}>
      <Blog>
        <Cover>
          <CoverImage source={{ uri: article.image }} />
        </Cover>
        <Title>{article.title}</Title>
        {/* <IntroText>{article.content}</IntroText> */}
        <HTML
          html={article.content}
          containerStyle={{ marginTop: 5, paddingHorizontal: 15 }}
          baseFontStyle={{
            fontSize: 14,
            color: "#95989a",
            fontFamily: "song-myung"
          }}
          tagsStyles={{
            h3: {
              color: "rgba(0,0,0,0.7)",
              fontWeight: "bold",
              fontSize: 20
            }
          }}
        />
      </Blog>
    </Container>
  );
};

BlogDetails.navigationOptions = ({ navigation }) => {
  // title: "Article Details"
  title: navigation.state.params.article.title;
};

const Container = styled.ScrollView`
  flex: 1;
`;
const Blog = styled.View`
  margin-bottom: 15;
  padding-bottom: 10;
  border-bottom-color: rgba(149, 152, 154, 0.1);
  border-bottom-width: 3;
`;
const Cover = styled.View`
  width: 100%;
  height: 200;
  margin-bottom: 20;
`;
const CoverImage = styled.Image`
  width: 100%;
  height: 200;
`;
const Title = styled.Text`
  padding-left: 15;
  padding-right: 15;
  font-family: "song-myung";
  font-size: 20;
  text-transform: capitalize;
  color: #000;
  opacity: 0.7;
`;
const IntroText = styled.Text`
  padding-left: 15;
  padding-right: 15;
  color: #95989a;
  font-family: "song-myung";
  font-size: 14;
  margin-top: 5;
`;

export default BlogDetails;
