import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Register from "../screens/Register";
import FirstTime from "../screens/FirstTime";
import ForgotPass from "../screens/ForgotPass";
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
    },
    FirstTimeOptions: {
      screen: FirstTime,
      navigationOptions: () => ({
        title: "One Last Step",
        headerLeft: null
      })
    },
    ForgotPass: {
      screen: ForgotPass,
      navigationOptions: {
        title: "Password Recovery"
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
