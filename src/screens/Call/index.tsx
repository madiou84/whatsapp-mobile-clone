import React, { useEffect, useState } from 'react';
import { FAB, Text } from 'react-native-paper';

import { FlatList } from 'react-native';
import { CONSTANTS } from '../../configs/constants';
import { Item } from '../../shared/list';

const CallScreen: React.FC<any> = ({navigation}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [serverError, setServerError] = useState<string>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        data.error ? setServerError(data.error) : setUsers(data.users);
      } catch (error: any) {
        setServerError(error.message);
      }
    };

    fetchUsers();
  }, [setUsers]);

  if (serverError) {
    return <Text testID="server-error">{serverError}</Text>;
  }

  if (!users) {
    return <Text>Loading...</Text>;
  }

  const isMissCall = (user: any) => user.id % 5 === 0;
  const isVideoCall = (user: any) => user.id % 8 === 0;
  const isEmitCall = (user: any) => !isMissCall(user) && user.id % 2 === 0;
  const isReceiveCall = (user: any) =>
    !isMissCall(user) && !isEmitCall(user) && user.id % 1 === 0;

  return (
    <React.Fragment>
      <FlatList
        data={users}
        renderItem={({item: user}) => (
          <Item
            isCall
            user={user}
            key={user.id}
            index={user.id}
            isMissCall={isMissCall(user)}
            isEmitCall={isEmitCall(user)}
            isVideoCall={isVideoCall(user)}
            isReceiveCall={isReceiveCall(user)}
          />
        )}
      />

      <FAB
        size="small"
        icon="video-plus"
        color="rgba(255,255,255, 1)"
        onPress={() => console.log('Pressed')}
        style={{
          right: 23,
          bottom: 90,
          position: 'absolute',
          backgroundColor: 'grey',
        }}
      />

      <FAB
        icon="phone-plus"
        color="rgba(255,255,255,1)"
        onPress={() => console.log('Pressed')}
        style={{
          right: 16,
          bottom: 16,
          position: 'absolute',
          backgroundColor: CONSTANTS.BG_COLOR,
        }}
      />
    </React.Fragment>
  );
};
export default CallScreen;
