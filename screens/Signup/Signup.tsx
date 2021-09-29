import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "native-base";
import * as React from "react";
import { StyleSheet, View } from "react-native";
export default function Signup({ navigation }: any) {
  return (
    <>
      <View style={styles.container}>
        <Box safeArea flex={1} p={2} w="90%" mx="auto">
          <Center>
            <Heading size="lg" pt={5}>
              Welcome
            </Heading>
            <Heading color="muted.400" size="xs">
              Sign Up to continue!
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
            <FormControl>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Phone No.
              </FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Username
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
            </FormControl>
            <FormControl mb={5}>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Confirm Password
              </FormControl.Label>
              <Input type="password" />
            </FormControl>
            <VStack space={2}>
              <Button colorScheme="cyan" _text={{ color: "white" }}>
                Signup
              </Button>
            </VStack>
            <HStack justifyContent="center">
              <Text fontSize="sm" color="muted.700" fontWeight={400}>
                Already have a account ?{" "}
              </Text>
              <Text
                color="cyan.500"
                onPress={() => navigation.navigate("login")}
              >
                Sign In
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
