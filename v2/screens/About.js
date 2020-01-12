import React from "react";
import styled from "styled-components/native";

const About = () => (
  <Container>
    <Text>
      Askinsurpedia.com is an online platform that allows people to receive
      answers to their insurance or wealth risk management questions 24 hours a
      day from verified Insurance, pension and wealth management consultants via
      the mobile app, SMS and web.
    </Text>
    <Text>
      With the dwindling awareness of how insurance and wealth risk management
      operates, Askinsurpedia.com is a resource and avenue to instill confidence
      and educate customers and practitioners alike.
    </Text>
    <Text>
      Askinsurpedia allows users send their questions via mobile app, SMS or
      web, then routes it to one of the verified consultants on the system who
      then provides an answer. This answer is then relayed to the user, and
      forms part of the knowledge database repository that other users can refer
      to a later time.
    </Text>
    <Text>Know your risks, Cover your risks … Askinsurpedia.</Text>
  </Container>
);

const Container = styled.ScrollView`
  flex: 1;
  padding: 30px 20px;
`;
const Text = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 16;
  color: #232727;
  margin-bottom: 15;
`;

export default About;
