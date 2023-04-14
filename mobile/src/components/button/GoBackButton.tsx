import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeft from '../../assets/svg/arrow-left.svg';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const GoBackButton: React.FC = () => {
  const [onPress, setOnPress] = useState(false);
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigator.goBack();
        }}
        onPressIn={() => {
          setOnPress(true);
        }}
        onPressOut={() => {
          setOnPress(false);
        }}>
        <View
          style={{
            ...styles.button,
            backgroundColor: onPress ? '#ccc' : undefined,
          }}>
          <ArrowLeft width={18} height={18} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
  },
  button: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },
});

export default GoBackButton;
