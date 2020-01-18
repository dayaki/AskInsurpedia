import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components/native";
import { RefreshControl, AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../components/Avatar";
import HomeQuestion from "../components/HomeQuestion";
import ExpertProfile from "../components/ExpertProfile";
import LoadingModal from "../constants/LoadingModal";
import { API_URL } from "../constants/Helper";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchQuestions();
  }, [refreshing]);

  const experts = [
    {
      image: require("../assets/images/profile2.jpg"),
      name: "Kayode Olatunbosun",
      title: "Chartered Financial Analyst"
    },
    {
      image: require("../assets/images/profile3.jpg"),
      name: "Ayodele Iyun",
      title: "Experienced Insurance Professional"
    },
    {
      image: require("../assets/images/profile1.jpg"),
      name: "Ayodeji Folorunso",
      title: "Experienced Insurance Professional"
    }
  ];

  useEffect(() => {
    checkSavedQuestions();
    checkUserStatus();

    const didBlurSubscription = navigation.addListener("willFocus", () => {
      checkSavedQuestions();
    });
  }, []);

  const checkUserStatus = async () => {
    AsyncStorage.getItem("userData").then(data => {
      setUser(JSON.parse(data));
    });
  };

  const checkSavedQuestions = () => {
    AsyncStorage.getItem("questions").then(data => {
      if (data === null) {
        fetchQuestions();
      } else {
        setQuestions(JSON.parse(data));
        fetchQuestions();
      }
    });
  };

  const fetchQuestions = async () => {
    fetch(`${API_URL}questions/all`)
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
    navigation.navigate("HomeDetails", { question });
  };

  const openExpertProfile = expert => {
    // navigation.navigate("ExpertDetails", { expert });
  };

  const openAskQuestion = () => {
    navigation.navigate("AskQuestion");
  };

  const openSearch = () => {
    navigation.navigate("Search");
  };

  return (
    <>
      <HeaderBar>
        <SearchBtn activeOpacity={0.8} onPress={openSearch}>
          <Ionicons name="ios-search" size={26} color="#fff" />
        </SearchBtn>
        <Logo source={require("../assets/images/logo.png")} />
        <AskBtn activeOpacity={0.8} onPress={openAskQuestion}>
          <Ionicons name="md-add" size={24} color="#fff" />
          <AskBtnText>Ask</AskBtnText>
        </AskBtn>
      </HeaderBar>

      <Container
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {questions.length > 0 ? (
          <>
            <Header>
              <User>
                <Avatar source={user.photo} />
                <Username>
                  {user.fname} {user?.lname?.slice(0, 1)}.
                </Username>
              </User>
              <AskQuestion activeOpacity={0.8} onPress={openAskQuestion}>
                <AskQuestionText>What is your question?</AskQuestionText>
              </AskQuestion>
            </Header>

            <Featured>
              <FeaturedText>Featured Experts</FeaturedText>
              <SliderWrapper
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{ paddingRight: 90 }}
              >
                {experts.map((expert, index) => (
                  <Slider
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => openExpertProfile(expert)}
                  >
                    <ExpertProfile
                      image={expert.image}
                      name={expert.name}
                      title={expert.title}
                    />
                  </Slider>
                ))}
              </SliderWrapper>
            </Featured>

            <QuestionWrapper>
              {questions.map(question => (
                <HomeQuestion
                  key={question.id}
                  question={question}
                  onTap={() => openLink(question)}
                />
              ))}
            </QuestionWrapper>
          </>
        ) : (
          <LoadingModal />
        )}
      </Container>
    </>
  );
};

const HeaderBar = styled.View`
  background-color: #fc5185;
  padding: 10px;
  height: 80;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
const SearchBtn = styled.TouchableOpacity``;
const Logo = styled.Image`
  width: 50%;
  height: 30;
`;
const AskBtn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const AskBtnText = styled.Text`
  color: #fff;
  padding-left: 5px;
  font-family: "sourcepro-bold";
  font-weight: bold;
  font-size: 18;
`;
const Container = styled.ScrollView`
  flex: 1;
  background: #f4f4f4;
`;
const Header = styled.View`
  background-color: #fff;
  padding: 15px;
`;
const User = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Username = styled.Text`
  padding-left: 10;
  font-size: 20;
`;
const AskQuestion = styled.TouchableOpacity`
  margin-top: 15;
`;
const AskQuestionText = styled.Text`
  font-size: 18;
`;
const Featured = styled.View`
  margin-top: 10;
  padding-left: 15;
`;
const FeaturedText = styled.Text`
  font-weight: bold;
  font-size: 15;
  padding-bottom: 5;
`;
const SliderWrapper = styled.ScrollView``;
const Slider = styled.TouchableOpacity`
  width: 38%;
  margin-right: 8;
  height: 180; /*200; */
`;
const QuestionWrapper = styled.View`
  /* padding: 15px; */
`;

export default HomeScreen;
