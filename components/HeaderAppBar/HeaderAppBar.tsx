import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Icon, IconButton, StatusBar, Text } from "native-base";
import React from "react";

export default function HeaderAppBar() {
  return (
    <>
      <StatusBar backgroundColor="#DB4437" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#DB4437" />
      <HStack
        bg="#DB4437"
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space={2}>
          <IconButton
            icon={
              <Icon
                size="md"
                as={<MaterialIcons name="arrow-back" />}
                color="white"
              />
            }
          />
        </HStack>

        <HStack space={4} alignItems="center">
          <Text color="white" fontSize={20} fontWeight="bold">
            Home
          </Text>
        </HStack>

        <HStack space={2}>
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="account-circle" />}
                size="md"
                color="white"
              />
            }
          />
        </HStack>
      </HStack>
    </>
  );
}
