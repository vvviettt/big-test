import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';

interface BasicButtonProps {
  label: string;
  icon?: JSX.Element;
  onTap: Function;
  wrapperStyle?: ViewStyle;
  labelStyle?: TextStyle;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
}

const BasicButton: React.FC<BasicButtonProps> = ({
  onTap,
  icon,
  label,
  wrapperStyle,
  textColor,
  bgColor,
  labelStyle,
}) => {
  return (
    <View style={wrapperStyle ?? styles.wrapperStyle}>
      <TouchableOpacity onPress={() => onTap()} activeOpacity={1}>
        <View style={{...styles.contentView, backgroundColor: bgColor}}>
          {icon}
          <Text style={labelStyle ?? {...styles.contentText, color: textColor}}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BasicButton;

const styles = StyleSheet.create({
  wrapperStyle: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    overflow: 'hidden',
    borderRadius: 1000,
  },
  contentView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    height: 50,
    width: '100%',
  },
  contentText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 6,
  },
});
