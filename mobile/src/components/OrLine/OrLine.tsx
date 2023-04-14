import {StyleSheet, View, Text} from 'react-native';
const OrLine: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line}></View>
      <Text style={styles.text}>Hoặc</Text>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 10,
  },
  line: {flexGrow: 1, height: 1, backgroundColor: '#cccccc'},
  text: {
    marginHorizontal: 5,
    fontSize: 16,
  },
});

export default OrLine;
