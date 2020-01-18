import React, { useState, useEffect } from "react";
import { Switch, BackHandler } from "react-native";
import styled from "styled-components/native";
import { API_URL } from "../constants/Helper";
import { AsyncStorage } from "react-native";
import { LoadingModal } from "../components";

const FirstTime = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    { name: "Insurance", checked: false },
    { name: "Annuity and Investments", checked: false },
    { name: "Contracts and Liabilities", checked: false },
    { name: "Wills and Trusts", checked: false },
    { name: "Pensions", checked: false }
  ]);

  useEffect(() => {
    AsyncStorage.getItem("userData").then(value => {
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    });
    BackHandler.addEventListener("hardwareBackPress", () => {
      console.log("Back button is pressed");
      return true;
    });
  }, []);

  const onSwitched = (value, category) => {
    const temp = [...categories];
    const tempIndex = temp.findIndex(el => el.name === category.name);
    temp[tempIndex].checked = value;
    setCategories(temp);
  };

  const onContinue = () => {
    let NewCategories = [];
    categories.filter(elem => {
      if (elem.checked === true) {
        NewCategories.push(elem.name);
      }
    });
    if (NewCategories.length < 1) {
      toast.current.show("You need to subscribe to least two category.");
    } else {
      setLoading(true);
      fetch(`${API_URL}user/category/update`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          category: NewCategories.toString()
        })
      })
        .then(temp => temp.json())
        .then(data => {
          setLoading(false);
          navigation.navigate("Main");
        })
        .catch(err => {
          setLoading(false);
          console.log("err", err);
        });
    }
  };

  return (
    <Container>
      <LoadingModal
        visible={loading}
        loadingText="Updating your preference..."
      />
      <Intro>
        You’re almost done! Follow at least 2 categories to personalize your
        feed.
      </Intro>
      <TitleWrapper>
        <Title>Categories</Title>
      </TitleWrapper>
      {categories.map((category, index) => (
        <Switcher key={index}>
          <Label>{category.name}</Label>
          <Switch
            value={category.checked}
            onValueChange={e => onSwitched(e, category)}
          />
        </Switcher>
      ))}

      <Button activeOpacity={0.8} onPress={onContinue}>
        <ButtonText>Continue</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background: #f2f2f2;
`;
const Intro = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 15;
  opacity: 0.8;
  padding: 10px;
`;
const TitleWrapper = styled.View`
  background: #fff;
  padding: 15px;
  margin: 10px 0px;
`;
const Title = styled.Text``;
const Switcher = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10;
  border-bottom-color: #c3c3c3;
  border-bottom-width: 0.2;
`;
const Label = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 15;
  color: rgb(121, 121, 121);
`;
const Button = styled.TouchableOpacity`
  background: #fc5185;
  width: 50%;
  align-self: center;
  height: 45;
  margin: 5px 0px;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: #fff;
  text-transform: uppercase;
`;

export default FirstTime;
