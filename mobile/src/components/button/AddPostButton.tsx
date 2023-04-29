import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FloatingAction} from 'react-native-floating-action';
import AddIcon from '../../assets/svg/plus.svg';
import {Colors} from '../../config/colors';
import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

const AddPostButton: React.FC = () => {
  const navigation = useNavigation();
  const onClick = useCallback(() => {
    navigation.navigate('new_post' as never);
  }, []);
  return (
    <>
      <FloatingAction
        showBackground={false}
        floatingIcon={<AddIcon width={25} height={25} fill={Colors.white} />}
        color={Colors.blue}
        onPressMain={onClick}
      />
    </>
  );
};

export default AddPostButton;
