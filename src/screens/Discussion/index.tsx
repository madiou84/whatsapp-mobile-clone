import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Vibration } from 'react-native';
import { FAB, Text } from 'react-native-paper';

import { CONSTANTS } from '../../configs/constants';
import { Item } from '../../shared/list';


export default function Discussion({navigation}: any) {
  let [users, setUsers] = useState<any[]>([]);
  let [serverError, setServerError] = useState<string>();
  const [hasSelected, setHasSelected] = useState<any[]>([]);

  useEffect(() => {
    setHasSelected([]);

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

    return () => {
      setHasSelected([]);
    };
  }, [setUsers, setHasSelected]);

  const onLongPress = useCallback(
    (user: any) => {
      if (hasSelected.includes(user.id)) {
        setHasSelected(state => [...state.filter(it => it !== user.id)]);
      } else {
        setHasSelected(state => [...state, user.id]);
      }

      Vibration.vibrate(45);
    },
    [hasSelected, setHasSelected],
  );

  const onPress = useCallback(
    (user: any) => {
      navigation.navigate('DiscussionDetail', {
        user,
      });
    },
    [navigation],
  );

  if (serverError) {
    return <Text testID="server-error">{serverError}</Text>;
  }

  if (!users) {
    return <Text>Loading...</Text>;
  }

  return (
    <React.Fragment>
      <FlatList
        data={users}
        renderItem={({item: user}: any) => (
          <Item
            isTime
            user={user}
            isDiscussion
            key={user.id}
            onPress={() => onPress(user)}
            onLongPress={() => onLongPress(user)}
            selected={hasSelected.includes(user.id)}
          />
        )}
      />

      <FAB
        animated
        icon="android-messages"
        color="rgba(255,255,255,1)"
        onPress={() => console.log()}
        style={{
          right: 0,
          bottom: 0,
          margin: 16,
          position: 'absolute',
          backgroundColor: CONSTANTS.BG_COLOR,
        }}
      />
    </React.Fragment>
  );
}
