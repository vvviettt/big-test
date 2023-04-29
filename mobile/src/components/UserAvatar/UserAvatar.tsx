import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

interface UserAvatarProps {
  size: number;
  imageUrl?: string;
  onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({size, imageUrl, onClick}) => {
  return (
    <TouchableOpacity onPress={onClick} activeOpacity={1}>
      <FastImage
        style={{
          width: size,
          height: size,
          borderRadius: size,
        }}
        source={{
          uri: imageUrl,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
        defaultSource={require('../../assets/images/default_user_avatar.jpg')}
      />
    </TouchableOpacity>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({});
