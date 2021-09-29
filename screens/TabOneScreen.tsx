import { Avatar, Center, HStack } from "native-base";
import * as React from "react";
import { FooterTabBar, HeaderAppBar } from "../components/index";

export default function TabOneScreen() {
  return (
    <>
      <HeaderAppBar />
      <Center flex={1}>
        <HStack space={2}>
          <Avatar
            source={{
              uri: "https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg",
            }}
          >
            SS
          </Avatar>
          <Avatar
            source={{
              uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
            }}
          >
            GG
          </Avatar>
          <Avatar
            source={{
              uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
            }}
          >
            RS
          </Avatar>
          <Avatar
            source={{
              uri: "https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg",
            }}
          >
            AK
          </Avatar>
        </HStack>
      </Center>
      <FooterTabBar />
    </>
  );
}
