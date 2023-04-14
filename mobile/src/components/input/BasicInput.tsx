import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Control, Controller} from 'react-hook-form';
import {Colors} from '../../config/colors';
import EyeIcon from '../../assets/svg/eye.svg';
import EyeSlashIcon from '../../assets/svg/eye-slash.svg';

type BasicButtonProps = {
  name: string;
  placeholder?: string;
  control?: Control;
  rules?: any;
  secureText?: boolean;
};

const BasicInput: React.FC<BasicButtonProps> = ({
  name,
  placeholder,
  control,
  rules,
  secureText,
}) => {
  const [showText, setShowText] = useState<boolean>(false);
  return (
    <View style={styles.wrapper}>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder={placeholder ?? ''}
                placeholderTextColor={Colors.placeholder}
                secureTextEntry={!showText && secureText}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setShowText(!showText);
                }}
                style={styles.eyeIcon}>
                {secureText && <EyeIcon width={20} height={20} color="red" />}
              </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

export default BasicInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 30,
    flexGrow: 1,
  },
  inputWrapper: {},
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    flexDirection: 'row',
  },
  input: {
    flexGrow: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  eyeIcon: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 10,
    alignItems: 'center',
  },
  errorText: {
    marginTop: 6,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.error,
  },
});
