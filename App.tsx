import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { Provider } from "react-redux";
import Routes from "./navigation/Routes";
import store from "./redux/store/store";
import useCachedResources from "./resources/useCachedResources";
import { MenuProvider } from 'react-native-popup-menu';
export default function App() {
  const isLoadingComplete = useCachedResources();
 
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <Provider store={store}>
          <MenuProvider>
          <Routes />
          </MenuProvider>
        </Provider>
      </NativeBaseProvider>
    );
  }
}
