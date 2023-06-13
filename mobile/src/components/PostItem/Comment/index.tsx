/* eslint-disable react/react-in-jsx-scope */
import {FC, useEffect, useState} from 'react';
import {CommentResponse} from '../../../services/post/postInterface';
import {commentApi, getComments} from '../../../services/post/postService';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BasicInput from '../../input/BasicInput';
interface CommentContainerProps {
  postId: string;
}
const CommentContainer: FC<CommentContainerProps> = ({postId}) => {
  const [val, setVal] = useState<string>('');
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [newcomments, setNewComments] = useState<CommentResponse[]>([]);
  const getComment = async () => {
    const cm = await getComments(postId);
    setComments(cm);
  };
  useEffect(() => {
    getComment();
  }, []);

  const sendComment = async () => {
    setVal('');
    const comment = await commentApi(postId, val);
    setNewComments([...newcomments, comment]);
  };
  return (
    <View style={styles.commentWrapper}>
      <View style={{paddingRight: 30, gap: 10, paddingBottom: 14}}>
        {[...newcomments, ...comments].map(comment => {
          return (
            <View
              key={comment.id}
              style={{
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'flex-start',
              }}>
              <Image
                style={styles.commentOwner}
                source={{uri: comment.owner.avatarUrl}}
              />
              <View style={{flexDirection: 'row'}}>
                <View style={{}}>
                  <View
                    style={{
                      backgroundColor: '#ccc',
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}>
                    <Text style={{fontSize: 14}}>{comment.content}</Text>
                  </View>
                </View>
              </View>

              <View style={{flexGrow: 10}}></View>
            </View>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 15,
        }}>
        <TextInput
          value={val}
          onChangeText={setVal}
          style={styles.input}
          placeholder="Bình luận"
        />
        <TouchableOpacity
          onPress={() => {
            sendComment();
          }}
          style={styles.cmtBtn}>
          <Text style={{color: '#fff'}}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentContainer;

const styles = StyleSheet.create({
  commentWrapper: {
    gap: 10,
    paddingBottom: 14,
  },
  commentContainer: {
    flexDirection: 'row',
  },
  comment: {
    flexWrap: 'nowrap',
    marginHorizontal: 10,
  },
  commentOwner: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  cmtBtn: {
    backgroundColor: '#1d9bf0',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 10,
  },
});
