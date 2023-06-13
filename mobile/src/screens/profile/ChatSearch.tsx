import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../config/colors';

export default function ChatSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  return (
    <View style={styles.wrapper}>
      <TextInput
        onChangeText={value => setSearchTerm(value)}
        style={styles.searchInput}
        placeholder="Tìm kiếm"></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingLeft: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 15,
  },
});
