import React from "react";
import styled from "styled-components/native";

const ExpertProfile = ({ image, name, title }) => (
  <BgImage source={image}>
    <Profile>
      <Name>{name}</Name>
      <Cert>{title}</Cert>
    </Profile>
  </BgImage>
);

const BgImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;
const Profile = styled.View`
  background: rgba(33, 31, 31, 0.7);
  height: 50;
  justify-content: center;
  align-items: center;
`;
const Name = styled.Text`
  font-family: "song-myung";
  font-size: 12;
  color: #fff;
  margin-bottom: 3;
`;
const Cert = styled.Text`
  font-size: 9;
  color: #dedede;
  padding: 0px 5px;
`;

export default ExpertProfile;
