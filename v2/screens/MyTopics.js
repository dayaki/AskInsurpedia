import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import Toast, { DURATION } from "react-native-easy-toast";
import { AsyncStorage } from "react-native";
import { Switch } from "react-native";
import { API_URL } from "../constants/Helper";
import { LoadingModal } from "../components";

const MyTopics = () => {
  const [categories, setCategories] = useState([
    { name: "Insurance", checked: false },
    { name: "Annuity and Investments", checked: false },
    { name: "Contracts and Liabilities", checked: false },
    { name: "Wills and Trusts", checked: false },
    { name: "Pensions", checked: true }
  ]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem("userData").then(value => {
      const tempData = JSON.parse(value);
      setUser(tempData);
      const tempCategories = [...categories];
      let category = tempData.category.split(",");
      category.forEach(elem => {
        let foundIndex = tempCategories.findIndex(x => x.name == elem);
        tempCategories[foundIndex] = { name: elem, checked: true };
      });
      setCategories(tempCategories);
    });
  }, []);

  const onSwitched = (value, category) => {
    const temp = [...categories];
    const tempIndex = temp.findIndex(el => el.name === category.name);
    temp[tempIndex].checked = value;
    setCategories(temp);
  };

  const update = () => {
    let NewCategories = [];
    categories.filter(elem => {
      if (elem.checked === true) {
        NewCategories.push(elem.name);
      }
    });
    if (NewCategories.length === 0) {
      toast.current.show("You need to subscribe to least one category.");
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
          if (data.status === "success") {
            AsyncStorage.setItem("userData", JSON.stringify(data.data)).then(
              _ => {
                setLoading(false);
                toast.current.show("Categories updated successfully.");
              }
            );
          }
        });
    }
  };

  return (
    <Container>
      <LoadingModal
        visible={loading}
        onClose={() => setLoading(false)}
        loadingText="Updating your preference..."
      />
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

      <Button activeOpacity={0.8} onPress={update}>
        <ButtonText>Update Categories</ButtonText>
      </Button>
      <Toast ref={toast} />
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
