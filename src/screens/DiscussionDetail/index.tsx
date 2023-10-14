import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { FAB, TextInput } from 'react-native-paper';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CONSTANTS } from '../../configs/constants';

export default function DiscussionDetail() {
  const scheme = useColorScheme();
  const {width} = useWindowDimensions();
  let [, setServerError] = useState<string>();
  let [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    let fetchUsers = async () => {
      try {
        let res = await fetch('/api/users');
        let data = await res.json();
        data.error ? setServerError(data.error) : setUsers(data.users);
      } catch (error: any) {
        setServerError(error.message);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const isDark = scheme == 'dark';

  return (
    <View
      style={{ flex: 1 }}>
      <FlatList
        data={users}
        renderItem={({item: user}) => (
          <View
            key={user.id}
            style={{
              padding: 16,
              alignItems: user.id % 2 === 0 ? 'flex-start' : 'flex-end',
            }}>
            <View
              style={{
                maxWidth: 0.8 * width,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor:
                  user.id % 2 === 0
                    ? isDark
                      ? 'rgba(255, 255, 255, .1)'
                      : 'gray'
                    : 'rgba(144, 238, 144, .6)',
              }}>
              <Text style={{padding: 10}}>{user.title}</Text>
            </View>
          </View>
        )}
      />

      <View
        style={{
          paddingBottom: 5,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <TextInput
          mode="outlined"
          placeholder="Message..."
          style={{flex: 1, marginHorizontal: 5, }}
          left={<TextInput.Icon icon="camera" color={Colors.grey400} />}
          right={<TextInput.Icon icon="paperclip" color={Colors.grey200} />}
        />

        <View>
          <FAB
            icon="send"
            color={Colors.white}
            style={{backgroundColor: CONSTANTS.COLOR}}
          />
        </View>
      </View>
    </View>
  );
}
