import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GoBackButton from '../../components/button/GoBackButton';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import {useAppSelector} from '../../redux/store';
import ExclamationIcon from '../../assets/svg/circle-exclamation.svg';
import {Colors} from '../../config/colors';
import InputMessage from './InputMessage';
import {ScrollView} from 'react-native-gesture-handler';
import MessageItem from './MessageItem';

const ChatRoomPage = () => {
  const {roomSelected} = useAppSelector(state => state.chat);
  if (!roomSelected) {
    return (
      <SafeAreaView>
        <Text>Loading . . .</Text>
      </SafeAreaView>
    );
  }
  console.log(roomSelected.messages);

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <GoBackButton />
          <View style={styles.roomInfo}>
            <UserAvatar imageUrl={roomSelected.image} size={30} />
            <Text style={styles.roomName}>
              {roomSelected.roomName ?? roomSelected.users[0].name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <ExclamationIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.chatBox}>
          <ScrollView>
            {roomSelected.messages.map((message, index) => (
              <MessageItem message={message} key={index} />
            ))}
          </ScrollView>
        </View>
        <InputMessage />
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomPage;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  headerContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  btnGoBack: {},
  roomInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  roomName: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  chatBox: {
    flex: 1,
    paddingHorizontal: 15,
  },
  inputContainer: {},
});
