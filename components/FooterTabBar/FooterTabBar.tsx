import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Box, Center, HStack, Icon, Pressable, Text } from "native-base";
import React from "react";

export default function FooterTabBar() {
  const [selected, setSelected] = React.useState(1);
  return (
    <Box flex={1} bg="white" safeAreaTop>
      <Center flex={1}></Center>
      <HStack bg="#DB4437" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py={2}
          flex={1}
          onPress={() => setSelected(0)}
        >
          <Center>
            <Icon
              mb={1}
              as={<MaterialCommunityIcons name="home" />}
              color="white"
              size="md"
            />

            <Text color="white" fontSize={14}>
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py={2}
          flex={1}
          onPress={() => setSelected(1)}
        >
          <Center>
            <Icon
              mb={1}
              as={<MaterialCommunityIcons name="heart" />}
              color="white"
              size="md"
            />

            <Text color="white" fontSize={14}>
              Favorites
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 2 ? 1 : 0.6}
          py={2}
          flex={1}
          onPress={() => setSelected(2)}
        >
          <Center>
            <Icon
              mb={1}
              as={<MaterialIcons name="add-circle" />}
              color="white"
              size="md"
            />

            <Text color="white" fontSize={14}>
              Sell Any Car
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 3 ? 1 : 0.5}
          py={2}
          flex={1}
          onPress={() => setSelected(3)}
        >
          <Center>
            <Icon
              mb={1}
              as={<MaterialCommunityIcons name="view-list" />}
              color="white"
              size="md"
            />
            <Text color="white" fontSize={14}>
              My Ads
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}
