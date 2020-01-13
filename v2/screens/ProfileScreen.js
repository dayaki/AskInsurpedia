import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Alert, AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userData").then(data => {
      setUser(JSON.parse(data));
    });
  }, []);

  const handleNav = type => {
    if (type === "activity") {
      navigation.navigate("MyActivity");
    } else if (type === "topics") {
      navigation.navigate("MyTopics");
    } else if (type === "beexpert") {
      navigation.navigate("Expert");
    } else if (type === "risks") {
      navigation.navigate("Risk");
    } else if (type === "about") {
      navigation.navigate("About");
    }
  };

  const signout = () => {
    Alert.alert(
      "You really want to log out?",
      "",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Log out",
          onPress: () => {
            AsyncStorage.multiRemove(["userData", "questions"]).then(_ => {
              navigation.navigate("Auth");
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <Profile>
        <Avatar
          source={
            user.avatar
              ? { uri: user.avatar }
              : require("../assets/images/user-photo.png")
          }
        />
        <UserName>{user.name}</UserName>
        <Email>{user.email}</Email>
      </Profile>

      <NavLinks>
        <Links activeOpacity={0.8} onPress={() => handleNav("activity")}>
          <LinkText>My Activity</LinkText>
          <Ionicons name="ios-arrow-forward" color="#ababab" size={22} />
        </Links>
        <Links activeOpacity={0.8} onPress={() => handleNav("topics")}>
          <LinkText>Topics you follow</LinkText>
          <Ionicons name="ios-arrow-forward" color="#ababab" size={22} />
        </Links>
        <Links activeOpacity={0.8} onPress={() => handleNav("beexpert")}>
          <LinkText>Become an expert</LinkText>
          <Ionicons name="ios-arrow-forward" color="#ababab" size={22} />
        </Links>
        <Links activeOpacity={0.8} onPress={() => handleNav("risks")}>
          <LinkText>Cover your risks</LinkText>
          <Ionicons name="ios-arrow-forward" color="#ababab" size={22} />
        </Links>
        <Links activeOpacity={0.8} onPress={() => handleNav("about")}>
          <LinkText>About AskInsurpedia</LinkText>
          <Ionicons name="ios-arrow-forward" color="#ababab" size={22} />
        </Links>
        <Links activeOpacity={0.8} onPress={signout}>
          <LinkText>Sign out</LinkText>
          <Ionicons name="ios-arrow-forward" color="#ababab" size={22} />
        </Links>
      </NavLinks>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background: #e5e5e5;
`;
const Profile = styled.View`
  background: #fff;
  margin-bottom: 5;
  justify-content: center;
  align-items: center;
  padding-top: 40;
  padding-bottom: 10;
`;
const Avatar = styled.Image`
  width: 120;
  height: 120;
  border-radius: 60;
  margin-bottom: 10;
`;
const UserName = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 18;
  font-weight: 600;
  margin: 1px 0px;
  color: #0d0c0c;
`;
const Email = styled.Text`
  font-family: "open-sans";
  font-size: 14;
  margin: 0;
  color: #151515;
  opacity: 0.35;
`;
const NavLinks = styled.View``;
const Links = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  margin-bottom: 2;
`;
const LinkText = styled.Text`
  font-family: "open-sans";
  font-size: 17;
  color: #222;
  text-transform: capitalize;
`;

export default ProfileScreen;
