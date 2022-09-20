import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {CustomDrawerContent} from './CustomDrawer';
import { TabBar } from './TabBar';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props:any) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Drawer" component={TabBar}  options={{
            headerShown: false,
          }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
