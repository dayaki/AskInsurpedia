import React, { useState } from "react";
import styled from "styled-components/native";

const FirstTime = ({ navigation }) => {
  const [selected, setSelected] = useState([]);

  categories = [
    { name: "Insurance" },
    { name: "Annuity and Investments" },
    { name: "Contracts and Liabilities" },
    { name: "Wills and Trusts" },
    { name: "Pensions" }
  ];

  const onSwitched = category => {
    const temp = selected;
    temp.push(category);
    setSelected(temp);
  };

  return (
    <Container>
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
            onValueChange={_ => onSwitched(category.name)}
          />
        </Switcher>
      ))}

      <Button>
        <ButtonText>Update Categories</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
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
