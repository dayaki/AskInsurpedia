import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { WebView } from "react-native-webview";
import HTML from "react-native-render-html";
import NoContent from "../components/NoContent";

const BlogScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://backend.askinsurpedia.ng/public/api/articles")
      .then(res => res.json())
      .then(data => {
        // console.log("res", data);
        setArticles(data);
      });
  }, []);

  const openLink = article => {
    navigation.navigate("BlogDetails", { article });
  };

  return (
    <Container showsVerticalScrollIndicator={false}>
      {/* {articles === null && (

     )} */}

      {articles.length > 0 ? (
        articles.map(article => (
          <Blog
            activeOpacity={0.8}
            onPress={() => openLink(article)}
            key={article.id}
          >
            <Cover>
              <CoverImage source={{ uri: article.image }} />
            </Cover>
            <Title>{article.title}</Title>
            <HTML
              html={article.content.substring(0, 150) + "..."}
              containerStyle={{
                marginTop: 5,
                paddingHorizontal: 15
              }}
              style={{
                fontSize: 14,
                color: "#95989a",
                fontFamily: "song-myung"
              }}
            />
          </Blog>
        ))
      ) : (
        <NoContent text="No article available, check back later" />
      )}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
`;
const Blog = styled.TouchableOpacity`
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

export default BlogScreen;
