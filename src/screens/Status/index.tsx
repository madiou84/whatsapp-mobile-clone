import React, { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';

import { FlatList } from 'react-native';
import { CONSTANTS } from '../../configs/constants';
import { Item, ItemElement } from '../../shared/list';

export default function StatusScreen({navigation}: any) {
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

  return (
    <React.Fragment>
      <FlatList
        data={users}
        renderItem={({item: user, index: key}) => (
          <Item
            isStatus
            user={user}
            index={key}
            key={user.id}
            isUpdateView={user.id === '5'}
            hasAlreadyBeenSeen={
              user.id === '2' ||
              user.id === '3' ||
              user.id === '4' ||
              user.id === '5'
            }
            renderFirstItem={(props: any) => {
              const {index, selected, renderFirstItem, hasAlreadyBeenSeen} =
                props;
              return (
                <ItemElement
                  user={user}
                  isOurStatus
                  index={index}
                  isRecentUpdate
                  selected={selected}
                  renderFirstItem={renderFirstItem}
                  hasAlreadyBeenSeen={hasAlreadyBeenSeen}
                />
              );
            }}
          />
        )}
      />

      <FAB
        animated
        size="small"
        icon="pencil"
        color="rgba(255, 255, 255, 1)"
        onPress={() => console.log('Pressed')}
        style={{
          right: 23,
          bottom: 90,
          position: 'absolute',
          backgroundColor: CONSTANTS.COLOR,
        }}
      />

      <FAB
        animated
        icon="camera"
        color="rgba(255, 255, 255, 1)"
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
}
