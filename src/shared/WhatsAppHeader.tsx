import React from 'react';
import {Text, View} from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import {CONSTANTS} from '../configs/constants';

const WhatsAppHeader = () => {
  return (
    <View
      style={{
        height: 60,
        paddingHorizontal: 15,
        backgroundColor: CONSTANTS.BG_COLOR,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 10,
        }}>
        <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white'}}>
          WhatsApp Clone
        </Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={{paddingRight: 2, color: 'white'}}>
            <IconMI size={30} name="search" />
          </Text>

          <Text style={{paddingLeft: 2, color: 'white'}}>
            <IconMC size={28} name="dots-vertical" />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WhatsAppHeader;
