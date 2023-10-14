import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

function NoCameraDeviceError() {
  return (
    <View style={styles.container}>
      <Text>NoCameraDeviceError</Text>
    </View>
  );
}

const PhotoScreen: React.FC<any> = ({navigation}) => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  React.useEffect(() => {
    if (!hasPermission) {
      (async () => {
        await requestPermission();
      })();
    }
  }, []);

  if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default PhotoScreen;
