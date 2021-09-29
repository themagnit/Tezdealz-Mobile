import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from "native-base";
import * as React from "react";
import { StyleSheet, View } from "react-native";
export default function Login({ navigation }: any) {
  return (
    <>
      <View style={styles.container}>
        <Box flex={1} p={2} w="90%" mx="auto" bg="default.400">
          <Center>
            <Heading size="lg" pt={5}>
              Welcome
            </Heading>
            <Heading color="muted.400" size="xs">
              Sign in to continue!
            </Heading>
          </Center>

          <VStack space={2} mt={5}>
            <FormControl>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Email ID
              </FormControl.Label>
              <Input />
            </FormControl>

            <FormControl mb={5}>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Password
              </FormControl.Label>
              <Input type="password" />
              <Link
                _text={{ fontSize: "xs", fontWeight: "700", color: "cyan.500" }}
                alignSelf="flex-end"
                mt={1}
              >
                Forget Password?
              </Link>
            </FormControl>
            <VStack space={2}>
              <Button
                colorScheme="cyan"
                _text={{ color: "white" }}
                onPress={() => navigation.navigate("home")}
              >
                Login
              </Button>
            </VStack>
            <HStack justifyContent="center">
              <Text fontSize="sm" color="muted.700" fontWeight={400}>
                I'm a new user.{" "}
              </Text>
              <Text
                color="cyan.500"
                onPress={() => navigation.navigate("signup")}
              >
                Sign Up
              </Text>
            </HStack>
          </VStack>
        </Box>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});
