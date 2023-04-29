import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import ChatSearch from './ChatSearch';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppSelector} from '../../redux/store';
import ChatRoomItem from './ChatItem';

export default function ChatPage() {
  const {rooms} = useAppSelector(state => state.chat);
  console.log(rooms);

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <HeaderBar>
          <ChatSearch />
        </HeaderBar>
        <ScrollView style={styles.scroll}>
          {rooms.map((room, index) => {
            return <ChatRoomItem key={index} room={room} />;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {height: '100%'},
  scroll: {flex: 1},
});
