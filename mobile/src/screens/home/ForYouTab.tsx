import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PostItem from '../../components/PostItem/PostItem';
import {Post} from '../../interfaces/Post.interface';

const posts: Post[] = [
  {
    ownerId: 'okok',
    ownerName: 'Elon Musk',
    postId: 'olkp',
    postCommentNumber: '10',
    postContent: 'As promised',
    postImages: [],
    postLinks: [],
    postLikeNumber: '10,5k',
    postShareNumber: '10k',
    postTime: new Date('2023-4-13T03:02:00'),
  },
];

export default function ForYouTab() {
  return (
    <View style={{justifyContent: 'space-between'}}>
      <ScrollView>
        {posts.map(item => (
          <PostItem post={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
