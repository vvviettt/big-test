import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import ChatSearch from './ChatSearch';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import ChatRoomItem from './ChatItem';
import BasicButton from '../../components/button/BasicButton';
import {getMyPost} from '../../redux/post/postSlice';
import PostItem from '../../components/PostItem/PostItem';

export default function ProfilePage() {
  const {user} = useAppSelector(state => state.user);
  const {myPosts} = useAppSelector(state => state.post);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyPost());
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{display: 'flex', flexDirection: 'row', gap: 16}}>
              <Image
                source={{uri: user?.avatarUrl}}
                style={{width: 32, height: 32, borderRadius: 32}}
              />
              <Text
                style={
                  styles.headerName
                }>{`${user?.firstName} ${user?.lastName}`}</Text>
            </View>
            <View style={{height: 30}}>
              <BasicButton
                wrapperStyle={{
                  width: 100,
                  backgroundColor: '#1d9bf0',
                  display: 'flex',
                  height: 30,
                  justifyContent: 'center',
                  borderRadius: 15,
                }}
                labelStyle={{fontSize: 13, color: 'white'}}
                label="Chỉnh sửa"
                onTap={() => {}}
              />
            </View>
          </View>

          <View style={styles.userDesWrap}>
            <Text style={styles.userDes}>{user?.description ?? ''}</Text>
          </View>
          <View style={styles.awstyle}>
            <TouchableOpacity style={styles.awtcontent}>
              <Text style={styles.flText}>
                {user?.followers ?? 0} người theo dõi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.awtcontent}>
              <Text style={styles.flText}>
                {user?.following ?? 0} đang theo dõi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingHorizontal: 15, paddingVertical: 5}}>
          <Text style={styles.postTitle}>Tất cả bài viết</Text>
          <ScrollView>
            <View>
              {myPosts.map((post, index) => {
                return <PostItem key={index} post={post} />;
              })}
            </View>
            <View style={{height: 160}}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {height: '100%'},
  scroll: {},
  headerWrapper: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerName: {
    fontSize: 20,
    fontWeight: '700',
  },
  userDesWrap: {
    paddingTop: 3,
  },
  userDes: {
    fontSize: 14,
    // fontWeight: '500',
  },
  awstyle: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  awtcontent: {
    flex: 100,
    display: 'flex',
    paddingTop: 10,
  },
  flText: {
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
