import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Message} from '../../redux/chat/interfaces/message';
import {Colors} from '../../config/colors';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({message}) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <View style={styles.subContent}>
          <Text style={styles.subContentText}>You</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>{message.content}</Text>
        </View>
      </View>
      <View style={{flex: 2}}></View>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    marginBottom: 4,
    flexDirection: 'row-reverse',
  },
  subContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  subContentText: {
    fontSize: 13,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.blue,
    // backgroundColor: '#E7ECF0',
    flexDirection: 'row',
    borderRadius: 24,
  },
  contentText: {
    fontSize: 16,
    letterSpacing: 0.5,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
