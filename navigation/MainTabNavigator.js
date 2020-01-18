import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Share } from "react-native";
import * as Sharing from "expo-sharing";

import HomeScreen from "../screens/HomeScreen";
import AskQuestion from "../screens/AskQuestion";
import QuestionScreen from "../screens/QuestionScreen";
import GiveAnswer from "../screens/GiveAnswer";
import Search from "../screens/Search";
import QuestionDetails from "../screens/QuestionDetails";
import BlogScreen from "../screens/BlogScreen";
import BlogDetails from "../screens/BlogDetails";
import ProfileScreen from "../screens/ProfileScreen";
import MyActivity from "../screens/MyActivity";
import MyTopics from "../screens/MyTopics";
import About from "../screens/About";
import CoverRisk from "../screens/CoverRisk";
import BeExpert from "../screens/BeExpert";

import {
  BookIcon,
  CommentIcon,
  BookmarkIcon,
  UserIcon
} from "../constants/Icons";

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  HomeDetails: {
    screen: QuestionDetails,
    navigationOptions: {
      headerShown: false
    }
  },
  AskQuestion: {
    screen: AskQuestion,
    navigationOptions: {
      headerShown: false
    }
  },
  GiveAnswer: {
    screen: GiveAnswer,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  Search: {
    screen: Search,
    navigationOptions: () => ({
      headerShown: false
    })
  }
});
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => <BookIcon focused={focused} />
  };
};

const QuestionsStack = createStackNavigator(
  {
    Questions: QuestionScreen,
    QuestionDetails: {
      screen: QuestionDetails,
      navigationOptions: {
        headerShown: false
      }
    },
    GiveAnswer: {
      screen: GiveAnswer,
      navigationOptions: () => ({
        headerShown: false
      })
    }
  },
  {
    defaultNavigationOptions: {
      title: "Questions",
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
QuestionsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => <CommentIcon focused={focused} />
  };
};

const BlogStack = createStackNavigator(
  {
    Blog: BlogScreen,
    BlogDetails: {
      screen: BlogDetails,
      navigationOptions: ({ navigation }) => ({
        headerRight: () => {
          const shareLink = () => {
            Share.share({
              message: navigation.state.params.article.title,
              url:
                "https://play.google.com/store/apps/details?id=com.askinsurpedia.mobile"
            }).then(result => {
              console.log("resu", result);
              if (result.action === Share.sharedAction) {
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            });
          };

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={shareLink}
              style={{ paddingRight: 10 }}
            >
              <Ionicons name="md-share" size={24} color="#fff" />
            </TouchableOpacity>
          );
        }
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      title: "Askinsurpedia Tips",
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
    },
    navigationOptions: {
      tabBarIcon: ({ focused }) => <BookmarkIcon focused={focused} />
    }
  }
);
BlogStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => <BookmarkIcon focused={focused} />
  };
};

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerShown: false
      })
    },
    MyActivity: {
      screen: MyActivity,
      navigationOptions: () => ({
        title: "My Questions"
      })
    },
    Details: {
      screen: QuestionDetails,
      navigationOptions: {
        headerShown: false
      }
    },
    MyTopics: {
      screen: MyTopics,
      navigationOptions: () => ({
        title: "Topics You Follow"
      })
    },
    About: {
      screen: About,
      navigationOptions: () => ({
        title: "About AskInsurpedia"
      })
    },
    Risk: {
      screen: CoverRisk,
      navigationOptions: () => ({
        title: "Cover My Risk"
      })
    },
    Expert: {
      screen: BeExpert,
      navigationOptions: () => ({
        title: "Become An Expert"
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
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
ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => <UserIcon focused={focused} />
  };
};

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    QuestionsStack,
    BlogStack,
    ProfileStack
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#fc5185",
      style: {
        backgroundColor: "#fff"
      }
    }
  }
);

export default tabNavigator;
