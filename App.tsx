import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import {
  DefaultTheme as PaperDefaultTheme,
  PaperProvider,
} from 'react-native-paper';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CONSTANTS } from './src/configs/constants';
import Routes from './src/routes';
import { generateFakeUsersData } from './src/shared/server';

generateFakeUsersData();

export function App() {
  const scheme = useColorScheme();

  const navCustomDarkTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: CONSTANTS.BG_COLOR,
      background: Colors.rebeccapurple,
    },
  };

  const paperTheme = {
    ...PaperDefaultTheme,
    dark: scheme === 'dark',
    colors: {
      ...PaperDefaultTheme.colors,
      primary: CONSTANTS.BG_COLOR,
    },
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer
        theme={scheme === 'dark' ? navCustomDarkTheme : DefaultTheme}>
        <StatusBar
          animated
          barStyle="default"
          backgroundColor={CONSTANTS.BG_COLOR}
        />
        <PaperProvider theme={paperTheme}>
          <Routes />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
