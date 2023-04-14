import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GoBackButton from '../button/GoBackButton';

type Props = {
  title?: string;
};

const TitleHeader: React.FC<Props> = props => {
  return (
    <View style={styles.wrapper}>
      <GoBackButton />
      {props.title && <Text>{props.title}</Text>}
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
});
