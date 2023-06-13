import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import EllipsisIcon from '../../assets/svg/ellipsis.svg';
import LoveIcon from '../../assets/svg/love.svg';
import CommentIcon from '../../assets/svg/comment.svg';
import ShareIcon from '../../assets/svg/share.svg';
import {convertTimePost} from '../../utils/timeHelper';
import {Colors} from '../../config/colors';
import {PostResponse} from '../../services/post/postInterface';
import CommentContainer from './Comment';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../redux/store';

interface PostItemProps {
  post: PostResponse;
}

const PostItem: React.FC<PostItemProps> = ({post}) => {
  const [showComment, setShowComment] = useState(false);
  const {user} = useAppSelector(state=>state.)

  return (
    <View style={{paddingTop: 16, borderBottomWidth: 1, borderColor: '#ccc'}}>
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <TouchableOpacity activeOpacity={1}>
            <Image
              style={styles.image}
              source={
                {uri: post.owner.avatarUrl} ??
                require('./../../assets/images/default_user_avatar.jpg')
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{width: 10}}></View>
        <View style={{flex: 1}}>
          <View style={styles.headerView}>
            <View style={styles.ownerNameView}>
              <Text
                style={
                  styles.ownerName
                }>{`${post.owner.firstName} ${post.owner.lastName}`}</Text>
            </View>
            <View style={styles.headerOption}>
              <TouchableOpacity activeOpacity={1}>
                <View style={styles.headerOptionBtn}>
                  <EllipsisIcon width={20} height={20} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                width: '100%',
                display: 'flex',
              }}>
              put some music on it, represented abstractly sghsssssss whatssss
              music? anything's fine
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.actionWrap}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.actionItem}
          onPress={() => {
            setShowComment(!showComment);
          }}>
          <LoveIcon width={16} height={16} />
          <Text>{post.likes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.actionItem}
          onPress={() => {
            setShowComment(!showComment);
          }}>
          <CommentIcon width={16} height={16} />
          <Text>{post.commentTotal}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowComment(!showComment);
          }}
          activeOpacity={1}
          style={styles.actionItem}>
          <ShareIcon width={16} height={16} />
        </TouchableOpacity>
      </View>
      {showComment && <CommentContainer postId={post.id} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  imageContainer: {
    overflow: 'hidden',
  },
  ownerNameView: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  contentContainer: {},
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 5,
  },
  headerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  ownerName: {
    fontSize: 16,
    color: Colors.content,
    fontWeight: '700',
  },
  headerOptionBtn: {
    paddingHorizontal: 8,
  },
  actionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
export default PostItem;
