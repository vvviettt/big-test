import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../redux/store';
import FastImage from 'react-native-fast-image';

interface HeaderBarProps {
  children?: React.ReactNode;
  optionComponent?: React.ReactNode;
}

const HeaderBar: React.FC<HeaderBarProps> = ({children, optionComponent}) => {
  const {user} = useAppSelector(state => state.user);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={1}>
        <FastImage
          style={styles.avatarImage}
          source={{
            uri: user?.avatarUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
          defaultSource={require('../../assets/images/default_user_avatar.jpg')}
        />
      </TouchableOpacity>
      <View style={styles.labelWrapper}>{children}</View>
      <View style={styles.option}>{optionComponent && optionComponent}</View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#BDC5CD',
    borderBottomWidth: 0.5,
    borderColor: '#BDC5CD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  labelWrapper: {
    flex: 1,
  },
  option: {
    minWidth: 35,
    alignItems: 'flex-end',
  },
});
