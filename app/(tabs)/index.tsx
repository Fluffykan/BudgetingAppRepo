import { StyleSheet, Button, View, Text } from 'react-native';
import style from '@/styling/style';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen() {

  async function readSaveFile() {
    console.log("start");
    const path = FileSystem.documentDirectory + '/data.txt';
    const content = await FileSystem.readAsStringAsync(path);
    console.log(content);
    console.log("end");
}

  return (
    <View style={style.pageContainer}>
      <Text>HomeScreen</Text>
      <Button title='read save' onPress={() => readSaveFile()} />

    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
