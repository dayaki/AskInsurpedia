import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components/native";
import { Switch } from "react-native";

const MyTopics = () => {
  const [categories, setCategories] = useState([
    { name: "Insurance", checked: false },
    { name: "Annuity and Investments", checked: false },
    { name: "Contracts and Liabilities", checked: false },
    { name: "Wills and Trusts", checked: false },
    { name: "Pensions", checked: true }
  ]);

  const onSwitched = (value, category) => {
    const temp = categories;
    const tempIndex = temp.findIndex(el => el.name === category.name);
    temp[tempIndex].checked = value; //{ name: category.name, checked: value };
    setCategories(temp);
  };

  return (
    <Container>
      <Intro>
        Select the categories of questions you are interested in, to personalize
        your feed.
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

      <Button>
        <ButtonText>Update Categories</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.ScrollView`
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

export default MyTopics;
