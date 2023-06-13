import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedbackComponent,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import ImageIcon from '../../assets/svg/image.svg';
import SendIcon from '../../assets/svg/send.svg';
import {Colors} from '../../config/colors';

const InputMessage = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.btnOption}>
          <ImageIcon width={20} height={20} />
        </View>
        <TouchableOpacity style={styles.hiddenInput} activeOpacity={1}>
          <TextInput
            autoFocus
            multiline
            placeholder="Nhắn tin"
            placeholderTextColor={'#687684'}
            style={styles.hiddenText}></TextInput>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1}>
          <SendIcon width={25} height={25} fill={Colors.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputMessage;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E7ECF0',
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  hiddenInput: {
    flex: 1,
  },
  hiddenText: {
    fontSize: 16,
  },
  btnOption: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 10,
  },
});
