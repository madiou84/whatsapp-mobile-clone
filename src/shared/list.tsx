import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import {
  default as IconM,
  default as IconMI,
} from 'react-native-vector-icons/MaterialCommunityIcons';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import {CONSTANTS} from '../configs/constants';

export const List: React.FC<any> = ({
  children,
  styleScrollView,
  styleContainer,
  ...rest
}) => {
  return (
    <View style={{flex: 1, ...styleContainer}} {...rest}>
      <ScrollView style={styleScrollView}>{children}</ScrollView>
    </View>
  );
};

export const Item: React.FC<any> = props => {
  const {index, user, selected, renderFirstItem, hasAlreadyBeenSeen, ...rest} =
    props;

  if (renderFirstItem && index === 0) {
    return renderFirstItem(user, selected, rest);
  }

  return <ItemElement {...props} />;
};

export const ItemElement: React.FC<any> = (props: any) => {
  const {
    user,
    index,
    isCall,
    isTime,
    selected,
    isStatus,
    isEmitCall,
    isMissCall,
    isVideoCall,
    isOurStatus,
    isDiscussion,
    isUpdateView,
    isReceiveCall,
    isRecentUpdate,
    renderFirstItem,
    hasAlreadyBeenSeen,
    ...rest
  } = props;

  return (
    <React.Fragment>
      <TouchableOpacity
        {...rest}
        style={{
          height: 70,
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          backgroundColor: selected ? CONSTANTS.BG_COLOR : 'transparent',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ItemImage
            item={user}
            isStatus={isStatus}
            selected={selected}
            hasAlreadyBeenSeen={hasAlreadyBeenSeen}
          />

          <View style={{marginLeft: 15}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                // color: 'rgba(0, 0, 0, .7)',
              }}>
              {user.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              {isDiscussion && (
                <React.Fragment>
                  <IconM
                    size={23}
                    name="check-all"
                    color="rgba(0, 191, 255, 1)"
                  />
                  {user.id % 5 === 0 && (
                    <React.Fragment>
                      <IconM
                        size={20}
                        name="microphone"
                        color="rgba(0, 191, 255, 1)"
                      />
                      <Text
                        style={{
                          // color: 'rgba(105, 105, 105, 1)',
                          fontSize: 15,
                        }}>
                        00:04
                      </Text>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              {isCall && (
                <React.Fragment>
                  {isMissCall && (
                    <IconM
                      size={23}
                      color="red"
                      name="arrow-bottom-left"
                    />
                  )}
                  {isReceiveCall && (
                    <IconM
                      size={23}
                      name="arrow-bottom-left"
                      color="rgba(0, 191, 255, 1)"
                    />
                  )}
                  {isEmitCall && (
                    <IconM
                      size={23}
                      name="arrow-top-right"
                      color="rgba(0, 128, 0, 1)"
                    />
                  )}
                </React.Fragment>
              )}

              {user.id % 5 !== 0 && (
                <React.Fragment>
                  <Text
                    style={{
                      fontSize: 15,
                      // color: 'rgba(105, 105, 105, 1)',
                    }}>
                    {user.id % 4 === 0 ? `(2) ` : ''} {user.title}
                  </Text>
                </React.Fragment>
              )}
            </View>
          </View>
        </View>

        {isOurStatus && (
          <View>
            <IconM
              size={20}
              name="dots-horizontal"
              color="rgba(0, 128, 0, 1)"
            />
          </View>
        )}

        {isCall && (
          <React.Fragment>
            <IconMI
              size={20}
              color="rgba(0, 128, 0, 1)"
              name={isVideoCall ? 'video' : 'phone'}
            />
          </React.Fragment>
        )}

        {isTime && (
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                // color: 'rgba(105, 105, 105, 1)',
              }}>
              {user.createdAt}
            </Text>
            {user.id % 6 === 0 && (
              <IconI
                size={20}
                name="volume-mute"
                // color={'rgba(105, 105, 105, 1)'}
              />
            )}
          </View>
        )}
      </TouchableOpacity>

      {isRecentUpdate && <LabelStatus label="Récentes mises à jour" />}
      {isUpdateView && <LabelStatus label="Mises à jour vues" />}
    </React.Fragment>
  );
};

export const LabelStatus: React.FC<any> = ({label}: any) => {
  return (
    label && (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontWeight: '700'}}>{label}</Text>
      </View>
    )
  );
};

export const ItemImage: React.FC<any> = ({
  item,
  selected,
  isStatus,
  hasAlreadyBeenSeen,
}: any) => {
  return (
    <View>
      <View
        style={
          isStatus && {
            padding: 2,
            borderWidth: 2,
            borderRadius: 100,
            borderColor: hasAlreadyBeenSeen
              ? 'green'
              : 'rgba(105, 105, 105, 1)',
          }
        }>
        <Image
          source={{uri: item.avatarUrl}}
          style={{width: 50, height: 50, borderRadius: 100}}
        />
      </View>
      {selected && (
        <IconS
          size={20}
          name="check"
          // color="rgba(255, 255, 255, 1)"
          style={{
            right: -2,
            bottom: 2,
            borderRadius: 100,
            position: 'absolute',
            backgroundColor: CONSTANTS.BG_COLOR,
          }}
        />
      )}
    </View>
  );
};
