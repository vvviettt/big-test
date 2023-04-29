import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Post} from '../../interfaces/Post.interface';
import EllipsisIcon from '../../assets/svg/ellipsis.svg';
import {date} from 'yup';
import {convertTimePost} from '../../utils/timeHelper';
import {Colors} from '../../config/colors';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({post}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <TouchableOpacity activeOpacity={1}>
          <Image
            style={styles.image}
            source={require('./../../assets/images/default_user_avatar.jpg')}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: 10}}></View>
      <View style={styles.contentContainer}>
        <View style={styles.headerView}>
          <View style={styles.ownerNameView}>
            <Text style={styles.ownerName}>{post.ownerName}</Text>
          </View>
          <View style={styles.headerOption}>
            <Text>{convertTimePost(post.postTime)}</Text>
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.headerOptionBtn}>
                <EllipsisIcon width={20} height={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{}}>
          <Text>
            put some music on it, represented abstractly sghsssssss whatssss
            music? anything's fine
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  contentContainer: {
    // backgroundColor: '#000',
    // width: '100%',
  },
  headerView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ownerNameView: {
    // flexGrow: 1,
  },
  ownerName: {
    fontSize: 16,
    color: Colors.content,
    fontWeight: '700',
  },
  headerOptionBtn: {
    paddingHorizontal: 8,
  },
});
export default PostItem;
