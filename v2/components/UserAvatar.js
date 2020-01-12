import React from "react";
import styled from "styled-components/native";
import moment from "moment";
import Avatar from "./Avatar";

const UserAvatar = ({ user, time, type, hidden }) => (
  <Wrapper>
    {hidden === "0" ? <Avatar source={user.photo} /> : <Avatar />}
    <User>
      {hidden === "0" ? (
        <Name>
          {user.fname} {user.lname}
        </Name>
      ) : (
        <Name>Anonymous</Name>
      )}
      {type === "asked" ? (
        <Stamp>Asked {moment(time).format("MMM D")}</Stamp>
      ) : (
        <Stamp>Answered {moment(time).format("MMMM D")}</Stamp>
      )}
    </User>
  </Wrapper>
);

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8;
`;
const User = styled.View`
  padding-left: 5;
`;
const Name = styled.Text`
  font-family: "sourcepro-regular";
  font-size: 15;
  color: #575757;
`;
const Stamp = styled.Text`
  font-size: 12;
  font-family: "sourcepro-regular";
  color: #95989a;
`;

export default UserAvatar;
