import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { AsyncStorage, Switch } from "react-native";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from "expo-google-sign-in";
import IconButton from "../components/IconButton";
import LoadingModal from "../components/LoadingModal";
import { API_URL } from "../constants/Helper";

const Landing = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = () => {
    AsyncStorage.getItem("userData").then(value => {
      if (value !== null) {
        navigation.navigate("Main");
      }
    });
  };

  const fbLogin = () => {
    Facebook.initializeAsync("413867365740794", "AskInsurpedia").then(() => {
      Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"]
      })
        .then(({ type, token }) => {
          if (type === "success") {
            setLoading(true);
            fetch(
              `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`
            )
              .then(res => res.json())
              .then(response => {
                let newstring = response.name.split(/[ ,]+/);
                let [fname, lname] = newstring;
                fetch(`${API_URL}fb`, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    fname,
                    lname,
                    email: response.email,
                    fbid: response.id,
                    photo: response.picture.data.url
                  })
                })
                  .then(temp => temp.json())
                  .then(result => {
                    console.log("result", result);
                    AsyncStorage.setItem(
                      "userData",
                      JSON.stringify(result.data)
                    ).then(_ => {
                      // navigation.navigate("Main");
                      if (result.firstTime) {
                        sendMail(result.data.email);
                        navigation.navigate("FirstTimeOptions");
                      } else {
                        navigation.navigate("Main");
                      }
                    });
                  })
                  .catch(err => console.log("err", err));
              });
          } else {
            // type === 'cancel'
          }
        })
        .catch(err => {
          alert(`Facebook Login Error: ${err.message}`);
        });
    });
  };

  const gLogin = async () => {
    GoogleSignIn.signInAsync().then(({ type, user }) => {
      if (type === "success") {
        setLoading(true);
        fetch(`${API_URL}google`, {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fname: user.firstName,
            lname: user.lastName,
            email: user.email,
            gid: user.uid,
            photo: user.photoURL
          })
        })
          .then(temp => temp.json())
          .then(result => {
            setLoading(false);
            AsyncStorage.setItem(
              "userData",
              JSON.stringify(result.data[0])
            ).then(_ => {
              if (result.firstTime) {
                sendMail(result.data.email);
                setLoading(false);
                navigation.navigate("FirstTimeOptions");
              } else {
                setLoading(false);
                navigation.navigate("Main");
              }
            });
          })
          .catch(err => {
            setLoading(false);
            alert(JSON.stringify(err));
          });
      }
    });
  };

  const openLogin = () => {
    navigation.navigate("Login");
  };
  const openSignup = () => {
    navigation.navigate("Signup");
  };

  const sendMail = async email => {
    const data = await fetch(`${API_URL}mail/later`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });
  };

  return (
    <Container>
      <LoadingModal
        visible={loading}
        onClose={() => setLoading(false)}
        loadingText="Authenticating..."
      />
      <TopWrapper>
        <Logo source={require("../assets/images/logo.png")} />
        <WelcomeText>
          simplifying insurance and wealth risk management.
        </WelcomeText>
        <Btns>
          <IconButton
            text="Login with facebook"
            icon="logo-facebook"
            bgcolor="#3B5998"
            iconcolor="#fff"
            onTap={fbLogin}
          />
          <IconButton
            text="Login with google+"
            icon="logo-googleplus"
            bgcolor="#0077B5"
            iconcolor="#fff"
            onTap={gLogin}
          />
          <IconButton
            text="Login with email"
            icon="md-mail"
            bgcolor="#fff"
            iconcolor="#F34A38"
            onTap={openLogin}
          />
        </Btns>
      </TopWrapper>

      <Footer>
        <FooterBtn activeOpacity={0.9} onPress={openSignup}>
          <FooterBtnText>Don't have an account yet?</FooterBtnText>
        </FooterBtn>
      </Footer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fc5185;
  padding-top: 100;
`;
const TopWrapper = styled.View`
  align-items: center;
  flex: 5;
`;
const Logo = styled.Image`
  width: 80%;
  height: 80;
`;
const WelcomeText = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 18;
  color: #fff;
  width: 70%;
  text-align: center;
`;
const Btns = styled.View`
  margin-top: 100;
  width: 80%;
`;
const Footer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
const FooterBtn = styled.TouchableOpacity`
  background: #fff;
  height: 80;
  align-items: center;
  padding-top: 20;
`;
const FooterBtnText = styled.Text`
  color: #000;
  text-transform: uppercase;
  font-family: "open-sans";
  font-weight: bold;
`;

export default Landing;
