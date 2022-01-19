import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "IBMPlexSans-ExtraLight": require("../assets/fonts/IBMPlexSans-ExtraLight.ttf"), //200
          "IBMPlexSans-Light": require("../assets/fonts/IBMPlexSans-Light.ttf"), //300
          "IBMPlexSans-Regular": require("../assets/fonts/IBMPlexSans-Regular.ttf"), //400
          "IBMPlexSans-Medium": require("../assets/fonts/IBMPlexSans-Medium.ttf"), //500
          "IBMPlexSans-SemiBold": require("../assets/fonts/IBMPlexSans-SemiBold.ttf"), //600
          "IBMPlexSans-Bold": require("../assets/fonts/IBMPlexSans-Bold.ttf"), //700
          "IBMPlexSans-Italic": require("../assets/fonts/IBMPlexSans-Italic.ttf"),
          "RRoboto-Thin-Italic": require('../assets/fonts/Roboto/Roboto-ThinItalic.ttf'),
          "Roboto-Thin": require('../assets/fonts/Roboto/Roboto-Thin.ttf'),
          "Roboto-Medium":require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
