import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {Room} from '../../redux/chat/interfaces/room';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import {convertTimePost} from '../../utils/timeHelper';
import {useAppDispatch} from '../../redux/store';
import {chooseRoomChat} from '../../redux/chat/chat.slice';
import {useNavigation} from '@react-navigation/native';

interface ChatRoomItem {
  room: Room;
}

const ChatRoomItem: React.FC<ChatRoomItem> = ({room}) => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  return (
    <TouchableHighlight
      underlayColor={'#ccc'}
      onPress={() => {
        dispatch(chooseRoomChat(room.roomId));
        nav.navigate('chat_room' as never);
      }}>
      <View style={styles.wrapper}>
        <UserAvatar size={55} imageUrl={room.image} />
        <View style={styles.contentContainer}>
          <View style={styles.contentMain}>
            <Text style={styles.roomName} numberOfLines={1}>
              {room.roomName ?? room.users[0].name}
            </Text>
            <Text style={styles.lastMessage}>{room.lastMessage.content}</Text>
          </View>
          <View style={styles.contentTime}>
            <Text style={styles.timeText}>
              {convertTimePost(room.lastMessage.time)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ChatRoomItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 12,
  },
  contentMain: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  contentTime: {
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  roomName: {
    fontSize: 16,
    fontWeight: '700',
    // overflow: ''
  },
  lastMessage: {
    fontSize: 15,
  },
  timeText: {
    fontSize: 13,
  },
});
