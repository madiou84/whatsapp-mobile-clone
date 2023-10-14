import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import IconE from 'react-native-vector-icons/Entypo';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconI from 'react-native-vector-icons/Ionicons';

import {CONSTANTS} from '../configs/constants';
import {
  Call,
  CallDetail,
  Discussion,
  DiscussionDetail,
  Photo,
  Status,
  StatusDetail,
} from '../screens';
import WhatsAppHeader from '../shared/WhatsAppHeader';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TopTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Disc."
      screenOptions={{
        tabBarStyle: {
          backgroundColor: CONSTANTS.BG_COLOR,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen name="Photo" component={Photo} />
      <Tab.Screen name="Disc." component={Discussion} />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Call" component={Call} />
    </Tab.Navigator>
  );
}

function LogoTitle({route}: any) {
  const {user} = route.params;

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: 40, height: 40, borderRadius: 100}}>
        <Image
          source={{uri: user.avatarUrl}}
          style={{width: 40, height: 40, borderRadius: 100}}
        />
      </View>
      <View style={{marginLeft: 15}}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          {user.name}
        </Text>
        <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>
          Vue aujourd'hui à 22:04
        </Text>
      </View>
    </View>
  );
}

function DiscussionStack() {
  return (
    <Stack.Navigator
      initialRouteName="Discussion"
      screenOptions={{
        headerStyle: {
          backgroundColor: CONSTANTS.BG_COLOR,
        },
      }}>
      <Stack.Screen
        name="Discussion"
        component={TopTabsNavigator}
        options={props => {
          return {
            header: (props: any) => <WhatsAppHeader {...props} />,
            tabBarLabel: 'WhatsApp Clone',
            ...props,
          };
        }}
      />
      <Stack.Screen name="CallDetail" component={CallDetail} />
      <Stack.Screen name="StatusDetail" component={StatusDetail} />
      <Stack.Screen
        name="DiscussionDetail"
        component={DiscussionDetail}
        options={props => {
          return {
            headerTintColor: '#fff',
            headerTitle: (selfProps: any) => (
              <LogoTitle {...selfProps} {...props} />
            ),
            headerRight: (props: any) => (
              <View style={{flexDirection: 'row'}}>
                <IconFA5 size={20} name="video" color={'white'} />
                <IconI
                  size={20}
                  name="call"
                  color={'white'}
                  style={{paddingHorizontal: 10}}
                />
                <IconE size={20} color={'white'} name="dots-three-vertical" />
              </View>
            ),
            headerShown: true,
          } as any;
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return <DiscussionStack />;
}

export default App;
