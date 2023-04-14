import {
  View,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface BasicButtonProps {
  label: string;
  icon?: JSX.Element;
  onTap: Function;
  wrapperStyle?: ViewStyle;
}

const BasicButton: React.FC<BasicButtonProps> = ({
  onTap,
  icon,
  label,
  wrapperStyle,
}) => {
  return (
    <View style={styles.wrapperStyle}>
      <TouchableNativeFeedback onPress={() => onTap()}>
        <Text>{label}</Text>
      </TouchableNativeFeedback>
    </View>
  );
};

export default BasicButton;

const styles = StyleSheet.create({
  wrapperStyle: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
