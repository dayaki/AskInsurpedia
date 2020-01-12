import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Register from "../screens/Register";
import MainTabNavigator from "./MainTabNavigator";

const AuthStack = createStackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: { headerShown: false }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login"
      }
    },
    Signup: {
      screen: Register,
      navigationOptions: {
        title: "Create an account"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#fc5185",
        paddingVertical: 10
      },
      headerTitleStyle: {
        fontFamily: "sourcepro-regular",
        fontWeight: "bold",
        fontSize: 22
      },
      headerTintColor: "#fff"
    }
  }
);

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    Main: MainTabNavigator
  })
);
